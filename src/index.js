import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import '@fortawesome/fontawesome-free/js/all.js';
import { Provider } from 'react-redux'
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <Provider store={store}>
    <React.Suspense fallback="Loading ...">
      <App />
    </React.Suspense>
  </Provider>
);
