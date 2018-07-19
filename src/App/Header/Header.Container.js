import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {
  getMainText,
  onEnterEditor,
  onEditText,
  onSubmitEdit,
} from 'modules/editor';
import HeaderComponent from './Header.Component';

const mapStateToProps = createStructuredSelector({inputText: getMainText});
const mapActionsToProps = {onEnterEditor, onEditText, onSubmitEdit};
const mergeProps = ({inputText}, {onEditText: onInputChange, ...actions}) => ({
  inputText,
  onInputChange,
  onEnter: () => actions.onEnterEditor(null, inputText),
  onSubmit: () => actions.onSubmitEdit(null, inputText),
});

export default connect(
  mapStateToProps,
  mapActionsToProps,
  mergeProps
)(HeaderComponent);
