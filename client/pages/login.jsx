import React from 'react';

class ValidatedInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  userEmail(event) {
    if (this.state.value === 'user.email@gmail.com') {
      return 'valid';
    } else { return 'invalid'; }
  }

  passMessage() {
    if (this.state.value === '') {
      return 'A password is required';
    } else if (this.state.value.length < 8) {
      return 'Your password is too short';
    } else {
      return null;
    }
  }
}
export default ValidatedInput;
