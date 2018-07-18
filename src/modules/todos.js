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
  isEmpty,
  isNil,
  map,
  nthArg,
  not,
  prop,
  reject,
  trim,
  T,
  values,
} from 'ramda';
import {combineReducers} from 'redux';
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
const isIdNil = compose(
  isNil,
  payload('id')
);

// edit
const isEdittorSubmitted = isType(EDIT_SUBMITTED);
const isEdit = both(isEdittorSubmitted, complement(isIdNil));

const text = rereducer('', [isEdit, getPayloadText]);
const completed = rereducer(false, [ACTIONS.ITEM_TOGGLED, not]);
const todo = combineReducers({id: (x = 0) => x, text, completed});
const todosEdit = subReducer(payload('id'))(todo);

// toggle all
const setAllCompleted = (isCompleted, state) =>
  map(assoc('completed', isCompleted), state);
const areAllCompleted = compose(
  all(prop('completed')),
  values
);
const toggleAll = converge(setAllCompleted, [
  compose(
    not,
    areAllCompleted
  ),
  identity,
]);

// add
const getNewId = nthArg(2);
const isNew = allPass([
  isEdittorSubmitted,
  isIdNil,
  complement(isPayloadTextEmpty),
]);
const addNew = addReducer(getNewId, {
  id: getNewId,
  text: getPayloadText,
  completed: false,
});

// delete
const isDelete = either(
  isType(ACTIONS.ITEM_DELETED),
  both(isEdit, isPayloadTextEmpty)
);
const deleteItem = converge(dissoc, [payload('id'), identity]);
const completedItems = filter(prop('completed'));
const incompletedItems = reject(prop('completed'));

const items = rereducer(
  {},
  [isNew, addNew],
  [isDelete, deleteItem],
  [ACTIONS.CLEAR_COMPLETED, incompletedItems],
  [ACTIONS.LIST_TOGGLED, toggleAll],
  [T, todosEdit]
);
const nextId = rereducer(1, [isNew, inc]);

export default combineDependantReducers({
  nextId,
  items: [items, '@prev nextId'],
});

// SELECTORS
const getTodos = prop('todos');
export const getItems = createSelector(getTodos, prop('items'));
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
