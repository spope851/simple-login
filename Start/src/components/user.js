import React from 'react';

class User extends React.Component{

  
  render(){
    const {username} = this.props
    const message =
      `Logged in as:  
      ${username? 
        username 
          : 
        'Guest'}, Welcome!`
    return (
      <div className="card text-dark">
        {message} 
        {username ? 
          ''
            :
          <span>Click <a href='/login'>here</a> to sign up for an account</span>}
      </div>
    );
  }
}
export default User;