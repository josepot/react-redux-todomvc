import {
  all,
  allPass,
  assoc,
  both,
  complement,
  converge,
  compose,
  dissoc,
  either,
  equals,
  filter,
  identity,
  inc,
  is,
  isEmpty,
  map,
  nthArg,
  not,
  prop,
  reject,
  trim,
  values,
} from 'ramda';
import {connect} from 'react-redux';
import {createSelector, createStructuredSelector} from 'reselect';
import combineDependantReducers from 'combine-dependant-reducers';
import rereducer from 'rereducer';
import {EDIT_SUBMITTED} from 'modules/editor';
import {createTypes, raiseAction} from 'lib/action-helpers';
import {addReducer, isType, subReducer, payload} from 'lib/reducer-helpers';
import {renderNothingWhen} from 'lib/hocs';

// ACTIONS
const ACTIONS = createTypes('TODOS', [
  'CLEAR_COMPLETED',
  'ITEM_DELETED',
  'ITEM_TOGGLED',
  'LIST_TOGGLED',
]);

// ACTION CREATORS
const todoAction = type => id => ({type, payload: {id}});
export const onClearCompleted = raiseAction(ACTIONS.CLEAR_COMPLETED);
export const onDeleteItem = todoAction(ACTIONS.ITEM_DELETED);
export const onToggleAll = raiseAction(ACTIONS.LIST_TOGGLED);
export const onToggleItem = todoAction(ACTIONS.ITEM_TOGGLED);

// REDUCER(s)

// common
const getPayloadText = compose(
  trim,
  payload('text')
);
const isPayloadTextEmpty = compose(
  isEmpty,
  getPayloadText
);
const isEdittorSubmitted = isType(EDIT_SUBMITTED);
const getPayloadId = payload('id');
const hasId = compose(
  is(Number),
  getPayloadId
);
const isEdit = both(isEdittorSubmitted, hasId);

// list toggled
const setAllCompleted = (isCompleted, state) =>
  map(assoc('completed', isCompleted), state);
const areAllCompleted = compose(
  all(prop('completed')),
  values
);
const toggleAll = converge(setAllCompleted, [
  complement(areAllCompleted),
  identity,
]);

// delete
const isDelete = either(
  isType(ACTIONS.ITEM_DELETED),
  both(isEdit, isPayloadTextEmpty)
);
const deleteItem = converge(dissoc, [getPayloadId, identity]);

// clear completed
const incompletedItems = reject(prop('completed'));

// new item
const isNew = allPass([
  isEdittorSubmitted,
  complement(hasId),
  complement(isPayloadTextEmpty),
]);
const getNewId = nthArg(2);
const newItem = addReducer(getNewId, {
  id: getNewId,
  text: getPayloadText,
  completed: false,
});

const updateTodoProp = (p, reducer) => subReducer(getPayloadId, p)(reducer);
const items = rereducer(
  {},
  [ACTIONS.LIST_TOGGLED, toggleAll],
  [ACTIONS.CLEAR_COMPLETED, incompletedItems],
  [isNew, newItem],
  [isDelete, deleteItem],
  [isEdit, updateTodoProp('text', getPayloadText)],
  [ACTIONS.ITEM_TOGGLED, updateTodoProp('completed', not)]
);
const nextId = rereducer(1, [isNew, inc]);

export default combineDependantReducers({
  nextId,
  items: [items, '@prev nextId'],
});

// SELECTORS
const getTodos = prop('todos');
export const getItems = createSelector(getTodos, prop('items'));
const completedItems = filter(prop('completed'));
export const getCompletedItems = createSelector(getItems, completedItems);
export const getIncompletedItems = createSelector(getItems, incompletedItems);
export const getIsListEmpty = createSelector(getItems, equals({}));
export const getAreAllCompleted = createSelector(getItems, areAllCompleted);

// HOCs
export const renderNothingWhenNoTodos = compose(
  connect(
    createStructuredSelector({isListEmpty: getIsListEmpty}),
    {}
  ),
  renderNothingWhen(prop('isListEmpty'))
);
