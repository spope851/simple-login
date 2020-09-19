import React from 'react';
import users from '../userInfo/users.json'
let axios = require('axios');
let user
let pass
let userIndex
let user_id

const logout = () => {
 alert("you're logged out");
}

const deleteAccount = () => {
  let ans = window.confirm("Are you sure?")
  if(ans){
    alert("deleted");
  }
}


class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    
  }
  
  changePassword(e) {
    e.preventDefault()
       alert("changed password");
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
                    <button disabled=false className="nav-link" >Change Password</button>
                  </td>
                  <td>
                    <button disabled=false className="nav-link" onClick={deleteAccount}>Delete Account</button>
                  </td>
                  <td>
                    <button disabled=false className="nav-link" onClick={logout}>Logout</button>
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
