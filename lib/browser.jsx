import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { reducers } from 'common/reducers';
import createRoutes from 'common/routes';
import { needsAuthentication, needsAuthorisation } from 'common/utils/auth-helper';

let state = null;
if (window.__REDUX_STATE__) {
  state = window.__REDUX_STATE__;
}

function requireAuth(nextState, replace) {
  const components = nextState.routes.map(route => route.component);

  if (needsAuthentication(components, state)) {
    return replace({
      pathname: '/login',
    });
  }

  if (needsAuthorisation(components, state)) {
    return replace({
      pathname: '/403',
    });
  }

  return true;
}

const store = createStore(reducers, state, applyMiddleware(thunk));
const routes = createRoutes(requireAuth);

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>,
  document.getElementById('container')
);
