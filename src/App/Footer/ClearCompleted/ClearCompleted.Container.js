import {isEmpty, prop} from 'ramda';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {createSelector, createStructuredSelector} from 'reselect';
import {renderNothingWhen} from 'lib/hocs';
import {getCompletedItems, onClearCompleted as onClear} from 'modules/todos';
import ClearCompletedComponent from './ClearCompleted.Component';

const noCompletedItems = createSelector([getCompletedItems], isEmpty);
const mapStateToProps = createStructuredSelector({noCompletedItems});

export default compose(
  connect(
    mapStateToProps,
    {onClear}
  ),
  renderNothingWhen(prop('noCompletedItems'))
)(ClearCompletedComponent);
