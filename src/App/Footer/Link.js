import {prop} from 'ramda';
import {connect} from 'react-redux';
import {NavLink} from 'react-router-dom';
import {compose, withProps} from 'recompose';

export default compose(
  connect(
    prop('router'),
    {}
  ),
  withProps({exact: true, activeClassName: 'selected'})
)(NavLink);
