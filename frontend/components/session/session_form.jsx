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
    formType === "login" ? formType = "Sign In" : formType = "Sign Up"
    let errors = {};
    if (this.props.errors) {
      this.props.errors.forEach(err => {
        errors[err] = err
      })
    }

    return(
      <div className="sessionContainer">
      <div className="sessionForm">
        <div className="sessionForm-logo">
          <p>NewTube</p>
          <img id="nav-bar-logo" src={window.logo}></img>
        </div>

        <div className="sessionForm-instructions">
          <h1>{formType}</h1>
          <p>to continue to NewTube</p>
        </div>


        <div className="sessionForm-input">
          <input onInput={this.updateUserName} value={this.state.username} placeholder="Enter your username"></input>
          {formType === "Login" ? errors["Invalid username/password combination"] : errors["Username can't be blank"]}
          {errors["Username has already been taken"]}
        </div>

        <div className="sessionForm-buttons">
          <button onClick={this.handleSubmit}>{formType}</button>
          <button>Next</button>
        </div>

      </div>
      </div>
    )
  }
}

export default withRouter(SessionForm);
