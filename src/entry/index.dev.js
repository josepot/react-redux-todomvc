import React from 'react';
import ReactDOM from 'react-dom';
import rootReducer from 'modules/root-reducer';
import App from 'App';
import configureStore from './store';
import Providers from './Providers';

export const render = (AppComponent, store) => {
  ReactDOM.render(
    <Providers store={store}>
      <AppComponent />
    </Providers>,
    document.getElementsByClassName('todoapp')[0]
  );
};

export const store = configureStore(rootReducer);

render(App, store);

if (module.hot) {
  module.hot.accept(['../App', '../modules/root-reducer'], () => {
    store.replaceReducer(rootReducer);
    render(App, store);
  });
}
