import React from 'react';

class signUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;
    const newState = {};
    newState[name] = value;
    this.setState(newState);
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/signup', req)
      .then(res => res.json());
    window.location.hash = '';
  }

  render() {
    return (
      <div className="container">
        <h2 id="logo">Micro Egg PCs</h2>
        <hr id="top-line"></hr>
        <form onSubmit={this.handleSubmit}>
          <div className="container" id="whitebox">
            <h3 id="register-header">Register</h3>
            <h6 id="email-registration">Email Address</h6>
            <input type="email" className="form-control" id="email-input" name="email" onChange={this.handleChange} ></input>
            <h6 id="password-registration">Password</h6>
            <input type="password" className="form-control" id="password-input" name="password" onChange={this.handleChange} ></input>
            <h6 id="confirm-password">Confirm Password</h6>
            <input type="password" className="form-control" id="password-input-confirm" name="password" onChange={this.handleChange}>
            </input>
            <button type="submit" id="register-confirm">Register</button>
          </div>
        </form>

      </div>
    );
  }
}
export default signUp;
