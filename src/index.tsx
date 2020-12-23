import React from 'react';
import { render } from 'react-dom';
import 'regenerator-runtime/runtime';

import App from './components/App';

import './models';

render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
