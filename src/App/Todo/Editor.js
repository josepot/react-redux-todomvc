import {not, prop} from 'ramda';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {renderNothingWhen} from 'lib/hocs';
import Editor from 'lib/components/Editor';
import {
  getEditor,
  onSubmitEdit,
  onCancelEdit,
  onEditText,
} from 'modules/editor';

const isDisabled = compose(
  not,
  prop('enable')
);

export default compose(
  renderNothingWhen(isDisabled),
  connect(
    getEditor,
    {onSubmitEdit, onCancelEdit, onEditText},
    (
      {idSelected: id, todoText: value},
      {onEditText: onChange, ...actions}
    ) => ({
      value,
      onChange,
      onBlur: () => actions.onCancelEdit(id),
      onPressEsc: () => actions.onCancelEdit(id),
      onPressEnter: () => actions.onSubmitEdit(id, value),
      autoFocus: true,
      className: 'edit',
    })
  )
)(Editor);
