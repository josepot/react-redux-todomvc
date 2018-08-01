import {assocPath} from 'ramda';

const fnOrVal = (...args) => x => (typeof x === 'function' ? x(...args) : x);

export default (...getters) => reducer => (state, ...rest) => {
  const path = getters.map(fnOrVal(state, ...rest));
  const oldVal = path.reduce(
    (res, prop) => (res === undefined ? res : res[prop]),
    state
  );
  const newVal = reducer(oldVal, ...rest);
  return oldVal === newVal ? state : assocPath(path, newVal, state);
};
