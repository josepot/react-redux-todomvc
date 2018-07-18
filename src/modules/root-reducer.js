import {combineReducers} from 'redux';

import editor from './editor';
import todos from './todos';

export default combineReducers({
  editor,
  todos,
});
