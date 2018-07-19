import React from 'react';
import PropTypes from 'prop-types';
import ClearCompleted from './ClearCompleted';
import Link from './Link';

export const Footer = ({nLeft}) => (
  <footer className="footer">
    <span className="todo-count">
      <strong>{nLeft}</strong> items left
    </span>
    <ul className="filters">
      <li>
        <Link to="/">All</Link>
      </li>
      <li>
        <Link to="/active">Active</Link>
      </li>
      <li>
        <Link to="/completed">Completed</Link>
      </li>
    </ul>
    <ClearCompleted />
  </footer>
);

Footer.propTypes = {
  nLeft: PropTypes.number.isRequired,
};

export default Footer;
