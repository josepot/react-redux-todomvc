import {compose, nthArg, path} from 'ramda';

export default (...args) =>
  args.length > 0
    ? compose(
        path(['payload', ...args]),
        nthArg(1)
      )
    : nthArg(1);
