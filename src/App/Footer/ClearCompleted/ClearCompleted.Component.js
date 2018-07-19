import React from 'react';
import PropTypes from 'prop-types';

const ClearCompleted = ({onClear}) => (
  <button className="clear-completed" onClick={onClear} type="button">
    Clear completed
  </button>
);

ClearCompleted.propTypes = {
  onClear: PropTypes.func.isRequired,
};

export default ClearCompleted;
