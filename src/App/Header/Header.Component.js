import React from 'react';
import PropTypes from 'prop-types';
import Editor from 'lib/components/Editor';

export const Header = ({onEnter, onInputChange, onSubmit, inputText}) => (
  <header id="header">
    <h1>todos</h1>
    <Editor
      autoFocus
      id="new-todo"
      className="new-todo"
      placeholder="What needs to be done?"
      value={inputText}
      onFocus={onEnter}
      onChange={onInputChange}
      onPressEnter={onSubmit}
    />
  </header>
);

Header.propTypes = {
  onEnter: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
  inputText: PropTypes.string.isRequired,
};

export default Header;
