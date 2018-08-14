import React from 'react';
import ReactDOM from 'react-dom';
import './components/App.css';

const renderApp = () => {
  const App = require('./components/App').default;
  ReactDOM.render(<App />, document.getElementById('root'));
};

renderApp();

// enable hot reloading
if (module.hot) {
  module.hot.accept('./components/App', renderApp);
}
