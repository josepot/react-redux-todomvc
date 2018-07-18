import {branch, renderNothing} from 'recompose';

export default fn => branch(fn, renderNothing);
