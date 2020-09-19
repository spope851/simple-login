import React from 'react';
import logo from './doge.png';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Account from './components/account';
import * as serviceWorker from './serviceWorker';
import {
  BrowserRouter as Router,
  Route
} from "react-router-dom";
import Login from './components/login';
import User from './components/user'
import users from './userInfo/users.json'



function Index() {
    return (
          <header className="App-header">
            <User username={activeUser}/>
            <div className="navbar">
              <a className="nav-link" href="/account">Account</a>
              <a className="nav-link" href="/app">App</a>
            </div>
            <img src={logo} className="App-logo" alt="logo" />
          </header>
    );
  
}
export default Index;

ReactDOM.render(
  <React.StrictMode>
    <div className="App">
      <Router>
          <Route path="/" component={Index} />
          <Route path="/login" component={Login} />
          <Route path="/account" component={Account} />
          <Route path="/app" component={App} />
      </Router>
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
