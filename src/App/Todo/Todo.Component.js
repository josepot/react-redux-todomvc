import classNames from 'classnames';
import React from 'react';
import PropTypes from 'prop-types';
import Editor from './Editor';

const Todo = ({
  text,
  isCompleted,
  isBeingEditted,
  onEditRequested,
  onDelete,
  onToggle,
}) => (
  <li className={classNames({completed: isCompleted, editing: isBeingEditted})}>
    <div className="view">
      <input
        className="toggle"
        type="checkbox"
        checked={isCompleted}
        onChange={onToggle}
      />
      <label onDoubleClick={onEditRequested}>{text}</label>
      <button type="button" className="destroy" onClick={onDelete} />
    </div>
    <Editor enable={isBeingEditted} />
  </li>
);

Todo.propTypes = {
  text: PropTypes.string.isRequired,
  isCompleted: PropTypes.bool.isRequired,
  isBeingEditted: PropTypes.bool.isRequired,
  onEditRequested: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
};

export default Todo;
