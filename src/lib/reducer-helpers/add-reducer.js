import {assoc, map} from 'ramda';

const fnOrVal = (...args) => x => (typeof x === 'function' ? x(...args) : x);

export default (keyGetter, template) => (state, ...rest) => {
  const key = fnOrVal(state, ...rest)(keyGetter);
  const getter = fnOrVal(state, ...rest);

  const newEntry =
    typeof template === 'object' ? map(getter, template) : getter(template);

  return assoc(key, newEntry, state);
};
