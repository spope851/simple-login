import React from 'react';
import users from '../userInfo/users.json'
let axios = require('axios');
let user
let pass
let userIndex
let user_id
users["users"].forEach(function(el, idx){
  if (el.signedIn === true){
    user_id = el.id
    user = el.username
    pass = el.password
    userIndex = idx
  }
});

const logout = () => {
  axios.put(`http://localhost:3000/users/${user_id}`, {
    "id": user_id,
    "username": user,
    "password": pass,  
    "signedIn":false})
    user = undefined
}

const deleteAccount = () => {
  let ans = window.confirm("Are you sure?")
  if(ans){
    axios.delete(`http://localhost:3000/users/${user_id}`)
  }
}


class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changepw: false,
      disabled: false
    }
    
  }
  
  changePassword(e) {
    e.preventDefault()
    let newPassword = document.getElementById('newP').value
    axios.put(`http://localhost:3000/users/${user_id}`, {
    "id": userIndex,
    "username": user,
    "password": newPassword,  
    "signedIn":false})
    window.alert('Password changes successfully!')
  }

  render() {
    return (
      <div>
        {user ? 
          <>
            <table className="table">
              <tbody>
                <tr>
                  <td>
                    <button disabled={this.state.disabled} className="nav-link" onClick={()=>this.setState({changepw: true, disabled: true})}>Change Password</button>
                  </td>
                  <td>
                    <button disabled={this.state.disabled} className="nav-link" onClick={deleteAccount}>Delete Account</button>
                  </td>
                  <td>
                    <button disabled={this.state.disabled} className="nav-link" onClick={logout}>Logout</button>
                  </td>
                </tr>
              </tbody>  
            </table>
            {this.state.changepw ? 
              <form onSubmit={this.changePassword.bind(this)}>
                <input id="newP" type="text" placeholder="New Password" />
                <input type="submit" value="Confirm"/>
              </form>
            :
              ''
            }
          </> 
        : 
          <a href={'/login'}>Login</a>
        }
      </div>
    );
  }
}

export default Account;