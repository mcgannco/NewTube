import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.updateUserName = this.updateUserName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateUserName(e) {
    e.preventDefault();
    this.setState({username: e.currentTarget.value})
  }

  updatePassword(e) {
    e.preventDefault();
    this.setState({password: e.currentTarget.value})
  }

  handleSubmit(e) {
    const { processForm } = this.props;
    e.preventDefault();
    const user = Object.assign({}, this.state);
    processForm(user);
  }



  render() {
    let {formType} = this.props;
    formType === "login" ? formType = "Login" : formType = "Sign Up"
    let errors = {};
    if (this.props.errors) {
      this.props.errors.forEach(err => {
        errors[err] = err
      })
    }

    return(
      <div className="sessionContainer">
      <div className="sessionForm">
        <h1>{formType}</h1>
        <input onInput={this.updateUserName} value={this.state.username} placeholder="Enter Username"></input>
        {formType === "Login" ? errors["Invalid username/password combination"] : errors["Username can't be blank"]}
        {errors["Username has already been taken"]}
        <input onInput={this.updatePassword} value={this.state.password} placeholder="Enter Password"></input>
        {errors["Password is too short (minimum is 6 characters)"]}
        <button onClick={this.handleSubmit}>{formType}</button>
      </div>
      </div>
    )
  }
}

export default withRouter(SessionForm);
