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

const getFilteredTodos = createSelector(
  [getFilter, getItems, getIncompletedItems, getCompletedItems],
  (key, all, active, completed) => ({all, active, completed}[key])
);

const getIds = createSelector(
  getFilteredTodos,
  compose(
    map(parseInt),
    keys
  )
);

export default compose(
  renderNothingWhenNoTodos,
  connect(
    createStructuredSelector({
      ids: getIds,
      areAllCompleted: getAreAllCompleted,
    }),
    {onToggleAll}
  )
)(TodosListComponent);
