import {always, complement, compose, isNil, nthArg, prop, T} from 'ramda';
import rereducer from 'rereducer';
import combineDependantReducers from 'combine-dependant-reducers';
import {createSelector} from 'reselect';
import {createTypes, raiseAction} from 'lib/action-helpers';
import {payload} from 'lib/reducer-helpers';

// ACTIONS
const ACTIONS = createTypes('EDITOR', [
  'EDITOR_ENTERED',
  'TEXT_EDITED',
  'EDIT_CANCELED',
  'EDIT_SUBMITTED',
]);

export const {EDIT_SUBMITTED} = ACTIONS;

// ACTION CREATORS
export const onEnterEditor = (id, text) => ({
  type: ACTIONS.EDITOR_ENTERED,
  payload: {id, text},
});
export const onEditText = text => ({
  type: ACTIONS.TEXT_EDITED,
  payload: {text},
});
export const onSubmitEdit = (id, text) => ({
  type: ACTIONS.EDIT_SUBMITTED,
  payload: {id, text},
});
export const onCancelEdit = raiseAction(ACTIONS.EDIT_CANCELED);

// REDUCERS
const idSelected = rereducer(
  null,
  [ACTIONS.EDITOR_ENTERED, payload('id')],
  [[ACTIONS.EDIT_CANCELED, ACTIONS.EDIT_SUBMITTED], always(null)]
);

const isMainTextSelected = compose(
  isNil,
  nthArg(2)
);

const commonText = rereducer(
  '',
  [ACTIONS.TEXT_EDITED, payload('text')],
  [ACTIONS.EDIT_SUBMITTED, always('')]
);
const mainText = rereducer('', [isMainTextSelected, commonText]);

const todoTextSub = rereducer(
  '',
  [ACTIONS.EDITOR_ENTERED, payload('text')],
  [ACTIONS.EDIT_CANCELED, always('')],
  [T, commonText]
);
const todoText = rereducer('', [complement(isMainTextSelected), todoTextSub]);

export default combineDependantReducers({
  idSelected,
  mainText: [mainText, '@next idSelected'],
  todoText: [todoText, '@next idSelected'],
});

// SELECTORS
export const getEditor = prop('editor');
export const getIdSelected = createSelector(getEditor, prop('idSelected'));
export const getTodoText = createSelector(getEditor, prop('todoText'));
export const getMainText = createSelector(getEditor, prop('mainText'));
