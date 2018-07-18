import PropTypes from 'prop-types';
import React from 'react';
import Todo from '../Todo';

const TodoList = ({areAllCompleted, onToggleAll, ids}) => (
  <section className="main">
    <input
      className="toggle-all"
      onChange={onToggleAll}
      type="checkbox"
      checked={areAllCompleted}
      value="on"
    />
    <ul className="todo-list">{ids.map(id => <Todo key={id} id={id} />)}</ul>
  </section>
);

TodoList.propTypes = {
  areAllCompleted: PropTypes.bool.isRequired,
  onToggleAll: PropTypes.func.isRequired,
  ids: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default TodoList;
