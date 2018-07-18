import {assoc} from 'ramda';

export default keyGetter => reducer => (state, ...rest) => {
  const key =
    typeof keyGetter === 'function' ? keyGetter(state, ...rest) : keyGetter;
  const oldVal = state[key];
  if (oldVal === undefined) return state;
  const newVal = reducer(oldVal, ...rest);
  return assoc(key, newVal, state);
};
