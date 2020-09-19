import React from 'react';
import users from '../userInfo/users.json'
let axios = require('axios');
let user
let pass
let userIndex
let user_id
let nextID
let userlist = users["users"]
let usernames = []
userlist.forEach(function(el, idx){
  if (el.signedIn === true){
    user_id = el.id
    user = el.username
    pass = el.password
    userIndex = idx
  }
  usernames.push(el.username)
  nextID = el.id + 1
});
class Login extends React.Component {
  constructor(props) {
    super(props); 
      this.state = {
        notSignedUp: false,
        wrongPassword: false,
        usernameUnavailable:false,
    }
  }
  
  login (e) {
    e.preventDefault()
    let username = document.getElementById('loginU').value
    let password = document.getElementById('loginP').value
    if(usernames.indexOf(username) > -1){
      user_id = userlist[usernames.indexOf(username)].id;
      pass = userlist[usernames.indexOf(username)].password;
      if(password === pass){
        axios.put(`http://localhost:3000/users/${user_id}`, {
        "id": user_id,
        "username": username,
        "password": password,  
        "signedIn":true})
        this.props.history.push('/');
      }
      else{
        this.setState({wrongPassword: true});
      }
    }
    else{
      this.setState({notSignedUp: true});
    }
  }

  signup (e) {
    e.preventDefault()
    let username = document.getElementById('signupU').value
    let password = document.getElementById('signupP').value
    if(usernames.indexOf(username) === -1){
      const axios = require('axios');
      axios.post(`http://localhost:3000/users`,{
        "id": nextID,
        "username": username,
        "password": password,
        "signedIn":true})
      this.props.history.push('/');
      return username
    }
    else {
      this.setState({usernameUnavailable: true})
    }
  }
  render() {
    return (
      <div>
        <h2>Login:</h2>
        <br />
        <form onSubmit={this.login.bind(this)}>
          <input id="loginU" type="text" placeholder="Username" />
          <input id="loginP" type="text" placeholder="Password" />
          <input type="submit" value="Login"/>
        </form>
        {this.state.notSignedUp && <p style={{color:'red'}}>We can't find your account. Sign up below!</p>}
        {this.state.wrongPassword && <p style={{color:'red'}}>Incorrect Password</p>}
        <br />
        <h3>Or sign up for free:</h3>
        <br />
        <form onSubmit={this.signup.bind(this)}>
          <input id="signupU" type="text" placeholder="Username" />
          <input id="signupP" type="text" placeholder="Password" />
          <input type="submit" value="Sign Up"/>
        </form>
        {this.state.usernameUnavailable && <p style={{color:'red'}}>Username unavailable! Try another</p>}
      </div>
    );
  }
}

export default Login;