import React from 'react';
let axios = require('axios');
let user
let user_id

const logout = () => {
  axios.put(`http://localhost:5000/api/users`, {"function":"logout"})
  document.location.reload()
}

const deleteAccount = () => {
  let ans = window.confirm("Are you sure?")
  if(ans){
    axios.delete(`http://localhost:5000/api/users`, { "data": {"id":user_id}})
    document.location.reload()
  }
}
  
const changePassword = () => {
  let newPassword = document.getElementById('newP').value
  axios.put(`http://localhost:5000/api/users`, {
    "function":"changePassword",
    "id": user_id,
    "newPassword": newPassword
  })
  document.location.reload()
  window.alert('Password changes successfully!')
}

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      changepw: false,
      disabled: false
    }
    
  }

  render() {

    var request = new XMLHttpRequest();
    request.open('GET', 'http://localhost:5000/api/users', false);  // `false` makes the request synchronous
    request.send();
    if (request.status === 200) {
      let res = JSON.parse(request.response)
      res.forEach(function(el, idx){
        if (el.signedIn === true){
          user_id = el.id
          user = el.username
        }
      })}

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
              <form onSubmit={changePassword}>
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