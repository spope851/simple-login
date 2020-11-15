import React from 'react';
let axios = require('axios');
let nextID
let usernames = []
let passwords = []
let IDs = []

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
      if(password === passwords[usernames.indexOf(username)]){
        axios.put(`http://localhost:5000/api/users`, {"function":"login", "id":IDs[usernames.indexOf(username)]})
        this.props.history.push('/app')
        document.location.reload()
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
      axios.post(`http://localhost:5000/api/users`,{
        "id": nextID,
        "username": username,
        "password": password,
        "signedIn":true
      })
      this.props.history.push('/app')
      document.location.reload()
    }
    else {
      this.setState({usernameUnavailable: true})
    }
  }

  render() {

    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:5000/api/users', false);  // `false` makes the request synchronous
    request.send();
    if (request.status === 200) {
      let res = JSON.parse(request.response)
      res.forEach(function(el){
        usernames.push(el.username)
        passwords.push(el.password)
        IDs.push(el.id)
        nextID = el.id + 1
      })}

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