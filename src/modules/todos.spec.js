import {assocPath} from 'ramda';
import {onSubmitEdit} from 'modules/editor';
import todos, {
  onClearCompleted,
  onDeleteItem,
  onToggleAll,
  onToggleItem,
} from './todos';

describe('modules/todos', () => {
  describe('action creators', () => {
    const ACTIONS = todos.__get__('ACTIONS');

    test('onClearCompleted', () => {
      expect(onClearCompleted()).toEqual({
        type: ACTIONS.CLEAR_COMPLETED,
        payload: {},
      });
    });

    test('onDeleteItem', () => {
      const id = 6;
      expect(onDeleteItem(id)).toEqual({
        type: ACTIONS.ITEM_DELETED,
        payload: {id},
      });
    });

    test('onToggleAll', () => {
      expect(onToggleAll()).toEqual({
        type: ACTIONS.LIST_TOGGLED,
        payload: {},
      });
    });

    test('onToggleItem', () => {
      const id = 7;
      expect(onToggleItem(id)).toEqual({
        type: ACTIONS.ITEM_TOGGLED,
        payload: {id},
      });
    });
  });

  describe('reducer', () => {
    const initialState = {
      nextId: 1,
      items: {},
    };

    const stateAfterFooAdded = {
      nextId: 2,
      items: {
        '1': {id: 1, text: 'foo', completed: false},
      },
    };

    test('initialState', () => {
      expect(todos(undefined, {})).toEqual(initialState);
    });

    test('add', () => {
      const action = onSubmitEdit(null, 'foo');
      expect(todos(initialState, action)).toEqual(stateAfterFooAdded);
    });

    test('delete', () => {
      const action = onDeleteItem(1);
      const {items, nextId} = todos(stateAfterFooAdded, action);
      expect(items).toEqual(initialState.items);
      expect(nextId).toBe(stateAfterFooAdded.nextId);
    });

    test('clear completed', () => {
      const action = onClearCompleted();
      const state = {
        nextId: 6,
        items: {
          1: {id: 1, text: 'foo', completed: false},
          2: {id: 2, text: 'foo2', completed: true},
          3: {id: 3, text: 'foo3', completed: true},
          4: {id: 4, text: 'foo4', completed: false},
          5: {id: 5, text: 'foo5', completed: true},
        },
      };
      const expected = {
        nextId: 6,
        items: {
          1: {id: 1, text: 'foo', completed: false},
          4: {id: 4, text: 'foo4', completed: false},
        },
      };
      expect(todos(state, action)).toEqual(expected);
    });

    test('toogle all: All become active if they are all completed', () => {
      const action = onToggleAll();
      const state = {
        nextId: 6,
        items: {
          1: {id: 1, text: 'foo', completed: true},
          2: {id: 2, text: 'foo2', completed: true},
          3: {id: 3, text: 'foo3', completed: true},
          4: {id: 4, text: 'foo4', completed: true},
          5: {id: 5, text: 'foo5', completed: true},
        },
      };
      const expected = {
        nextId: 6,
        items: {
          1: {id: 1, text: 'foo', completed: false},
          2: {id: 2, text: 'foo2', completed: false},
          3: {id: 3, text: 'foo3', completed: false},
          4: {id: 4, text: 'foo4', completed: false},
          5: {id: 5, text: 'foo5', completed: false},
        },
      };
      expect(todos(state, action)).toEqual(expected);
    });

    test('toogle all: All become completed if they are any active', () => {
      const action = onToggleAll();
      const state = {
        nextId: 6,
        items: {
          1: {id: 1, text: 'foo', completed: true},
          2: {id: 2, text: 'foo2', completed: false},
          3: {id: 3, text: 'foo3', completed: true},
          4: {id: 4, text: 'foo4', completed: false},
          5: {id: 5, text: 'foo5', completed: true},
        },
      };
      const expected = {
        nextId: 6,
        items: {
          1: {id: 1, text: 'foo', completed: true},
          2: {id: 2, text: 'foo2', completed: true},
          3: {id: 3, text: 'foo3', completed: true},
          4: {id: 4, text: 'foo4', completed: true},
          5: {id: 5, text: 'foo5', completed: true},
        },
      };
      expect(todos(state, action)).toEqual(expected);
    });

    describe('edit todo text', () => {
      test('edits the item', () => {
        const text = 'bar baz';
        const action = onSubmitEdit(1, text);
        const expected = assocPath(
          ['items', '1', 'text'],
          text,
          stateAfterFooAdded
        );
        expect(todos(stateAfterFooAdded, action)).toEqual(expected);
      });

      test('the text is trimmed', () => {
        const originalText = '      bar baz      ';
        const action = onSubmitEdit(1, originalText);
        const expectedText = 'bar baz';
        const expected = assocPath(
          ['items', '1', 'text'],
          expectedText,
          stateAfterFooAdded
        );
        expect(todos(stateAfterFooAdded, action)).toEqual(expected);
      });

      test('deletes the item if its text is empty', () => {
        const text = '     ';
        const action = onSubmitEdit(1, text);
        const {items, nextId} = todos(stateAfterFooAdded, action);
        expect(items).toEqual(initialState.items);
        expect(nextId).toEqual(stateAfterFooAdded.nextId);
      });
    });

    test('toggle item', () => {
      const action = onToggleItem(1);
      const expected = assocPath(
        ['items', '1', 'completed'],
        true,
        stateAfterFooAdded
      );
      expect(todos(stateAfterFooAdded, action)).toEqual(expected);
      expect(todos(expected, action)).toEqual(stateAfterFooAdded);
    });
  });

  describe('selectors', () => {
    test('completedItems', () => {
      const completedItems = todos.__get__('completedItems');
      const items = {
        '1': {completed: true},
        '2': {completed: false},
        '3': {completed: true},
        '4': {completed: false},
        '5': {completed: true},
      };
      const expected = {
        '1': {completed: true},
        '3': {completed: true},
        '5': {completed: true},
      };
      expect(completedItems(items)).toEqual(expected);
    });
    test('incompletedItems', () => {
      const incompletedItems = todos.__get__('incompletedItems');
      const items = {
        '1': {completed: true},
        '2': {completed: false},
        '3': {completed: true},
        '4': {completed: false},
        '5': {completed: true},
      };
      const expected = {
        '2': {completed: false},
        '4': {completed: false},
      };
      expect(incompletedItems(items)).toEqual(expected);
    });
    test('areAllCompleted', () => {
      const areAllCompleted = todos.__get__('areAllCompleted');
      const allCompleted = {
        '1': {completed: true},
        '2': {completed: true},
      };
      expect(areAllCompleted(allCompleted)).toBe(true);

      const someIncompleted = {
        '1': {completed: true},
        '2': {completed: false},
      };
      expect(areAllCompleted(someIncompleted)).toBe(false);

      const allIncompleted = {
        '1': {completed: false},
        '2': {completed: false},
      };
      expect(areAllCompleted(allIncompleted)).toBe(false);
    });
  });
});
