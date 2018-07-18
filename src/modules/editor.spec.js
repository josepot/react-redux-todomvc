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
    });

    test('text edited: main', () => {
      const state = {
        idSelected: null,
        mainText: 'foo',
        todoText: '',
      };
      const action = onEditText('bar');
      const expected = {
        idSelected: null,
        mainText: 'bar',
        todoText: '',
      };
      expect(editor(state, action)).toEqual(expected);
    });

    test('text edited: todo', () => {
      const state = {
        idSelected: 54,
        mainText: 'foo',
        todoText: '',
      };
      const action = onEditText('baz');
      const expected = {
        idSelected: 54,
        mainText: 'foo',
        todoText: 'baz',
      };
      expect(editor(state, action)).toEqual(expected);
    });

    const testSubmit = (message, input, expected) => {
      test(message, () => {
        const text =
          input.idSelected !== null ? input.todoText : input.mainText;
        const action = onSubmitEdit(input.idSelected, text);
        expect(editor(input, action)).toEqual(expected);
      });
    };

    testSubmit(
      'text submitted: main',
      {
        idSelected: null,
        mainText: 'foo',
        todoText: '',
      },
      {
        idSelected: null,
        mainText: '',
        todoText: '',
      }
    );

    testSubmit(
      'text submitted: todo',
      {
        idSelected: 10,
        mainText: 'foo',
        todoText: 'bar',
      },
      {
        idSelected: null,
        mainText: 'foo',
        todoText: '',
      }
    );

    test('cancel', () => {
      const state = {
        idSelected: 10,
        mainText: 'foo',
        todoText: 'bar',
      };
      const action = onCancelEdit();
      const expected = {
        idSelected: null,
        mainText: 'foo',
        todoText: '',
      };
      expect(editor(state, action)).toEqual(expected);
    });
  });

  describe('internals', () => {
    const isMain = editor.__get__('isMain');
    test('isMain', () => {
      expect(isMain({}, {}, 5, null)).toBe(false);
    });
  });
});
