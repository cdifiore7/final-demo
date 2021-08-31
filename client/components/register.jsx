import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'chris@gmail.com',
      password: '12345',
      confirmedPassword: '12345'
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.name
    });
  }

  handleSubmit(event) {
    event.preventDefault();
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
            <input type="email" className="form-control" id="email-input" name="email" onChange={this.handleChange} value={this.state.email}></input>
            <h6 id="password-registration">Password</h6>
            <input type="password" className="form-control" id="password-input" name="password" onChange={this.handleChange} value={this.state.password}></input>
            <h6 id="confirm-password">Confirm Password</h6>
            <input type="password" className="form-control" id="password-input-confirm" name="confirmedPassword" onChange={this.handleChange} value={this.state.password}></input>
            <button type="submit" id="register-confirm" onClick={this.handleSubmit}>Register</button>
          </div>
        </form>
      </div>
    );
  }
}
export default Register;
