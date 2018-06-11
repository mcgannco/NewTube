import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userVerified: false
    };
    this.updateUserName = this.updateUserName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.processInput = this.processInput.bind(this);
  }

  componentWillReceiveProps(newProps) {
    debugger
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

  demoLogin() {
    const demo = {username: "DemoUser", password: "123456"};
    this.props.login(demo);
  }

  processInput() {
    let path;
    let {verifyUsername, formType, receiveSessionErrors, clearSessionErrors, processForm}  = this.props;
    formType === "login" ? path = "/signin" : path = "/signup"
    if (!this.state.userVerified) {
      verifyUsername({username: this.state.username, path: path }).then(
        username => {
          this.setState({userVerified: true});
          clearSessionErrors()
        },
        errors => {
          receiveSessionErrors(errors.responseJSON);
        }
      )
    } else {
      processForm({username: this.state.username, password: this.state.password})
    }

  }

  render() {
    let { formType } = this.props;
    let otherformType;
    let otherformTypelink;
    let input;
    !this.state.userVerified ? input = <input onInput={this.updateUserName} value={this.state.username} placeholder="Enter your username"></input> :
      input = <input onInput={this.updatePassword} value={this.state.password} placeholder="Enter your password"></input>
    formType === "login" ? formType = "Sign In" : formType = "Sign Up"
    this.props.match.path === "/signin" ? otherformType = "Sign Up" : otherformType = "Sign In"
    this.props.match.path === "/signin" ? otherformTypelink = "/signup" : otherformTypelink = "/signin"

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
          {input}
          {this.props.errors[0]}
        </div>

        <div className="sessionForm-buttons">
          <Link to={otherformTypelink}>{otherformType}</Link>
          <button onClick={this.processInput}>Next</button>
        </div>

        <div className="sessionForm-demo">
          <button onClick={this.demoLogin}>Demo</button>
        </div>

        </div>
      </div>
    )
  }
}

export default withRouter(SessionForm);
