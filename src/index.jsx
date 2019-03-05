import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { HashRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/index';
import persistDataLocally from './middleware/persist-data-locally';

let state;
try {
  state = localStorage.getItem('reduxStore');
  if(state === null) {
    state = '{}';
  }
  state = JSON.parse(state);
} catch(err) {
  state = {};
}
const store = createStore(rootReducer, state, applyMiddleware(persistDataLocally));

let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
);

const render = (Component) => {
  ReactDOM.render(
    <HashRouter>
      <Provider store={store}>
        <Component/>
      </Provider>
    </HashRouter>,
    document.getElementById('react-app-root')
  );
};

render(App);

/*eslint-disable */
if (module.hot) {
  module.hot.accept('./components/App', () => {
    render(App);
  });
}
/*eslint-enable */
