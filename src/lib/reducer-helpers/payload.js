import {compose, nthArg, path} from 'ramda';

export default (...args) =>
  compose(
    path(['payload', ...args]),
    nthArg(1)
  );
