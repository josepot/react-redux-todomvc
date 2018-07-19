import {prop} from 'ramda';
import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {NavLink as NavLinkO} from 'react-router-dom';
import ClearCompleted from './ClearCompleted';

const NavLink = connect(
  prop('router'),
  {}
)(NavLinkO);

export const Footer = ({nLeft}) => (
  <footer className="footer">
    <span className="todo-count">
      <strong>{nLeft}</strong> items left
    </span>
    <ul className="filters">
      <li>
        <NavLink exact to="/" activeClassName="selected">
          All
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/active" activeClassName="selected">
          Active
        </NavLink>
      </li>
      <li>
        <NavLink exact to="/completed" activeClassName="selected">
          Completed
        </NavLink>
      </li>
    </ul>
    <ClearCompleted />
  </footer>
);

Footer.propTypes = {
  nLeft: PropTypes.number.isRequired,
};

export default Footer;
