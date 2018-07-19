import {keys, length} from 'ramda';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {createSelector, createStructuredSelector} from 'reselect';
import {
  getIncompletedItems,
  renderNothingWhenNoTodos,
  onClearCompleted,
} from 'modules/todos';
import FooterComponent from './Footer.Component';

const getObjectLength = compose(
  length,
  keys
);
const nLeft = createSelector([getIncompletedItems], getObjectLength);

const mapStateToProps = createStructuredSelector({nLeft});
const mapActionsToProps = {onClear: onClearCompleted};

export default compose(
  renderNothingWhenNoTodos,
  connect(
    mapStateToProps,
    mapActionsToProps
  )
)(FooterComponent);
