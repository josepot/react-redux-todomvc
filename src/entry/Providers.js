import React from 'react';
import PropTypes from 'prop-types';
import {hot} from 'react-hot-loader';
import {Provider as ReduxProvider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';

function Providers({children, store}) {
  return (
    <ReduxProvider store={store}>
      <ConnectedRouter history={store.history}>{children}</ConnectedRouter>
    </ReduxProvider>
  );
}

Providers.propTypes = {
  children: PropTypes.node.isRequired,
  store: ReduxProvider.propTypes.store,
};

export default hot(module)(Providers);
