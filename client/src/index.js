//import dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import cookie from 'react-cookie';

//import other
import routes from './routes';
import reducers from './reducers/index';
import { AUTH_USER } from './actions/types';

//import base scss
require('./assets/stylesheets/base.scss');
require('./assets/stylesheets/lemonade.scss');
require('./assets/stylesheets/mobile.scss');

//import pages scss


//import partials scss
require('./assets/stylesheets/partials/_button.scss');
require('./assets/stylesheets/partials/_ctabox.scss');
require('./assets/stylesheets/partials/_ctapic.scss');
require('./assets/stylesheets/partials/_footer.scss');
require('./assets/stylesheets/partials/_navigation.scss');
require('./assets/stylesheets/partials/_socialicons.scss');
require('./assets/stylesheets/partials/_forms.scss');

//move page to top on page change
function onPageChange() {
  window.scrollTo(0,0);
}

//create stores
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
const store = createStoreWithMiddleware(reducers);

//load cookie
const token = cookie.load('token');

if (token) {
  // Update application state. User has token and is probably authenticated
  store.dispatch({ type: AUTH_USER });
}

//render dom
ReactDOM.render(
  <Provider store={store}>
    <Router
      onUpdate={onPageChange}
      history={browserHistory}
      routes={routes}
    />
  </Provider>,
  document.querySelector('#app'));
