import {keys, map} from 'ramda';
import {compose} from 'recompose';
import {connect} from 'react-redux';
import {createSelector, createStructuredSelector} from 'reselect';
import {
  getAreAllCompleted,
  getItems,
  getCompletedItems,
  getIncompletedItems,
  onToggleAll,
  renderNothingWhenNoTodos,
} from 'modules/todos';
import {createMatchSelector} from 'modules/router';
import TodosListComponent from './TodosList.Component';

const getFilter = createSelector(
  [createMatchSelector('/:filter')],
  match => (match ? match.params.filter : 'all')
);
const getFilteredTodos = state => {
  const key = getFilter(state);
  return {
    all: getItems,
    active: getIncompletedItems,
    completed: getCompletedItems,
  }[key](state);
};
const getIds = createSelector(
  getFilteredTodos,
  compose(
    map(parseInt),
    keys
  )
);
const mapStateToProps = createStructuredSelector({
  ids: getIds,
  areAllCompleted: getAreAllCompleted,
});

export default compose(
  renderNothingWhenNoTodos,
  connect(
    mapStateToProps,
    {onToggleAll}
  )
)(TodosListComponent);
