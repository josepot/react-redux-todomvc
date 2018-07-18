import React from 'react';
import PropTypes from 'prop-types';

const ENTER_KEY = 13;
const ESC_KEY = 27;

const Editor = ({value, onChange, onPressEnter, onPressEsc, ...props}) => (
  <input
    {...props}
    value={value}
    onChange={({target}) => onChange(target.value)}
    onKeyDown={({which}) => {
      if (which === ENTER_KEY && onPressEnter) {
        onPressEnter();
      } else if (which === ESC_KEY && onPressEsc) {
        onPressEsc();
      }
    }}
  />
);

Editor.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onPressEnter: PropTypes.func,
  onPressEsc: PropTypes.func,
};

export default Editor;
