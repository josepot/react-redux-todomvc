import {createBrowserHistory} from 'history';
import {applyMiddleware, compose, createStore} from 'redux';
import {connectRouter, routerMiddleware} from 'connected-react-router';
import loggerMiddleware from 'redux-logger';

const history = createBrowserHistory();
const devMode = process.env.NODE_ENV === 'development';

const common = [routerMiddleware(history)];
const dev = [loggerMiddleware];
const prod = [];
const middlewares = [...(devMode ? dev : prod), ...common];

const getEnhancers = () =>
  devMode && window.devToolsExtension ? [window.devToolsExtension()] : [];

export default reducer => {
  const store = compose(
    applyMiddleware(...middlewares),
    ...getEnhancers()
  )(createStore)(connectRouter(history)(reducer));
  store.history = history;
  return store;
};
