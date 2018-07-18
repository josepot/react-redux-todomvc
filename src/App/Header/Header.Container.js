import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  getMainText,
  onEnterEditor,
  onEditText,
  onSubmitEdit,
} from 'modules/editor';

import HeaderComponent from './Header.Component';

export default connect(
  createStructuredSelector({inputText: getMainText}),
  {onEnterEditor, onEditText, onSubmitEdit},
  ({inputText}, {onEditText: onInputChange, ...actions}) => ({
    inputText,
    onInputChange,
    onEnter: () => actions.onEnterEditor(null, inputText),
    onSubmit: () => actions.onSubmitEdit(null, inputText),
  })
)(HeaderComponent);
