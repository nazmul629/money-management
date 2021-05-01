import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux'
import store from './store';
import jwtDecode from 'jwt-decode';
import * as Types from './store/actions/type';
import setHaderToken from './utils/setHaderToken'

const token = localStorage.getItem('auth_token')

if(token){
  let decode = jwtDecode(token)
  setHaderToken(token)
  store.dispatch({
    type: Types.SET_USER,
    payload:{
      user:decode
    }
  })
}


ReactDOM.render(
  <Provider store={store}>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

reportWebVitals();
