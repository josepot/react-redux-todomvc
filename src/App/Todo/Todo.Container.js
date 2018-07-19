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
const mapTodo = ({id, text, completed: isCompleted}, selectedId) => ({
  text,
  isCompleted,
  isBeingEditted: id === selectedId,
});

const mapStateToProps = createSelector([getTodo, getIdSelected], mapTodo);
const mapActionsToProps = {onEnterEditor, onDeleteItem, onToggleItem};
const mergeProps = ({text, ...restState}, actions, {id}) => ({
  ...restState,
  text,
  onEditRequested: () => actions.onEnterEditor(id, text),
  onDelete: () => actions.onDeleteItem(id),
  onToggle: () => actions.onToggleItem(id),
});

export default connect(
  mapStateToProps,
  mapActionsToProps,
  mergeProps
)(TodoComponent);
