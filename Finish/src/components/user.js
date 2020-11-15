import React from 'react';  
let axios = require('axios')
const populateUsers = () => {
  axios.put(`http://localhost:5000/api/users`, 
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

  render(){

    ///////////
    ///Syncronous GET request. Legend has it this is BAD practice
    ////////////
    let data;
    let username = null
    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:5000/api/users', false);  // `false` makes the request synchronous
    request.send();
    if (request.status === 200) {
      let res = JSON.parse(request.response)
      if(res.length){data = true}
      res.forEach(function(el){
        if (el.signedIn === true){
          username = el.username
        }
      })}
      
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