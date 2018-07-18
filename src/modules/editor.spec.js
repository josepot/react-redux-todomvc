import editor, {
  onEnterEditor,
  onEditText,
  onSubmitEdit,
  onCancelEdit,
} from './editor';

describe('modules/editor', () => {
  describe('action creators', () => {
    const ACTIONS = editor.__get__('ACTIONS');

    test('onEnterEditor', () => {
      const [id, text] = [5, 'foo'];
      expect(onEnterEditor(id, text)).toEqual({
        type: ACTIONS.EDITOR_ENTERED,
        payload: {id, text},
      });
    });

    test('onEditText', () => {
      const text = 'bar';
      expect(onEditText(text)).toEqual({
        type: ACTIONS.TEXT_EDITED,
        payload: {text},
      });
    });

    test('onSubmitEdit', () => {
      const [id, text] = [7, 'bar'];
      expect(onSubmitEdit(id, text)).toEqual({
        type: ACTIONS.EDIT_SUBMITTED,
        payload: {id, text},
      });
    });

    test('onCancelEdit', () => {
      expect(onCancelEdit()).toEqual({
        type: ACTIONS.EDIT_CANCELED,
        payload: {},
      });
    });
  });

  describe('reducer', () => {
    const initialState = {
      idSelected: null,
      mainText: '',
      todoText: '',
    };

    test('initialState', () => {
      expect(editor(undefined, {})).toEqual(initialState);
    });

    test('editor entered', () => {
      let id = null;
      let text = 'thisTextWillBeIgnoredBecauseIdNull';

      let action = onEnterEditor(id, text);
      expect(editor(initialState, action)).toEqual(initialState);

      id = 5;
      text = 'foo';
      action = onEnterEditor(id, text);
      const expectedAfterEnteringTodo = {
        idSelected: id,
        mainText: '',
        todoText: text,
      };

      expect(editor(initialState, action)).toEqual(expectedAfterEnteringTodo);

      action = onEnterEditor(null, 'unimportant');
      expect(editor(expectedAfterEnteringTodo, action)).toEqual({
        idSelected: null,
        mainText: '',
        todoText: text,
      });
    });
  });
});
