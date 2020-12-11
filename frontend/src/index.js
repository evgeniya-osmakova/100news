import { I18nextProvider } from 'react-i18next';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import i18n from './i18n';
import reducers from './reducers';

const store = createStore(
  reducers,
  compose(
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
