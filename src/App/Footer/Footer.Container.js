import {complement, keys, isEmpty, length} from 'ramda';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {createSelector, createStructuredSelector} from 'reselect';
import {
  getIncompletedItems,
  getCompletedItems,
  renderNothingWhenNoTodos,
  onClearCompleted,
} from 'modules/todos';
import FooterComponent from './Footer.Component';

const getAreThereCompletedItems = createSelector(
  getCompletedItems,
  complement(isEmpty)
);

const getNIncompletedItems = createSelector(
  getIncompletedItems,
  compose(
    length,
    keys
  )
);

const selector = createStructuredSelector({
  nLeft: getNIncompletedItems,
  areThereCompletedItems: getAreThereCompletedItems,
});

export default compose(
  renderNothingWhenNoTodos,
  connect(
    selector,
    {onClear: onClearCompleted}
  )
)(FooterComponent);
