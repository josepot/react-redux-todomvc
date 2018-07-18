import {assoc, map} from 'ramda';

export default (keyGetter, template) => (state, ...rest) => {
  const key =
    typeof keyGetter === 'function' ? keyGetter(state, ...rest) : keyGetter;

  const newEntry =
    typeof template === 'object'
      ? map(x => (typeof x === 'function' ? x(state, ...rest) : x), template)
      : template;

  return assoc(key, newEntry, state);
};
