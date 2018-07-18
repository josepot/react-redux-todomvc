import {compose, nthArg, prop} from 'ramda';
import {connect} from 'react-redux';
import {createSelector} from 'reselect';
import createCachedSelector from 're-reselect';

import {getIdSelected, onEnterEditor} from 'modules/editor';

import {getItems, onDeleteItem, onToggleItem} from 'modules/todos';
import TodoComponent from './Todo.Component';

const getPropId = compose(
  prop('id'),
  nthArg(1)
);
const getTodo = createCachedSelector([getPropId, getItems], prop)(getPropId);

const selector = createSelector(
  [getTodo, getIdSelected],
  ({id, text, completed: isCompleted}, selectedId) => ({
    text,
    isCompleted,
    isBeingEditted: id === selectedId,
  })
);

export default connect(
  selector,
  {
    onEnterEditor,
    onDeleteItem,
    onToggleItem,
  },
  ({text, ...restState}, actions, {id}) => ({
    ...restState,
    text,
    onEditRequested: () => actions.onEnterEditor(id, text),
    onDelete: () => actions.onDeleteItem(id),
    onToggle: () => actions.onToggleItem(id),
  })
)(TodoComponent);
