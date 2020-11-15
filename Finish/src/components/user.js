import React from 'react';  
import getUsers from '../services/user.service'

let axios = require('axios')

const MONGO_EXPRESS_API = process.env.REACT_APP_MONGO_USERS || ''

const populateUsers = () => {
  axios.put(MONGO_EXPRESS_API, 
  {
    "function":"populate",
    "users":[
      {
          id: 0,
          username: 'spope',
          password: '0123',
          signedIn: false
      },
      {
          id: 1,
          username: 'tlutke',
          password: '0123',
          signedIn: false
      },
      {
          id: 2,
          username: 'emusk',
          password: '0123',
          signedIn: false
      },
      {
          id: 3,
          username: 'abecker',
          password: '0123',
          signedIn: false
      },
      {
          id: 4,
          username: 'nhill',
          password: '0123',
          signedIn: false
      },
      {
          id: 5,
          username: 'pattia',
          password: '0123',
          signedIn: false
      },
      {
          id: 6,
          username: 'nravikant',
          password: '0123',
          signedIn: false
      }
    ]
  })
  document.location.reload()
}

class User extends React.Component{

  constructor(props) {
    super(props); 
      this.state = {
      users: []
    };
  }

  componentDidMount() {
    getUsers()
      .then(res => this.setState({ users: res }))
      .catch(err => console.log(err));
  }

  render(){

    let data;
    let username = null

    if(this.state.users.length){data = true}
    this.state.users.forEach(function(el){
      if (el.signedIn === true){
        username = el.username
      }
    })
      
    const message =
      `Logged in as:  
      ${username? 
        username 
          : 
        'Guest'}, Welcome!`
    return (
      <>
      {data ?
        <div className="card text-dark">
          {message} 
          {username ? 
            ''
            :
            <span>Click <a href='/login'>here</a> to sign up for an account</span>}
        </div>
      :
        <button onClick={populateUsers}>No users in DB. Click here to add some</button>}
      </>
    );
  }
}
export default User;