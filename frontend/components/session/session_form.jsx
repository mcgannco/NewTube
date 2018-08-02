import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SessionForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      userVerified: false,
      formType: "",
      reRoute: ""
    };
    this.updateUserName = this.updateUserName.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
    this.demoLogin = this.demoLogin.bind(this);
    this.processInput = this.processInput.bind(this);
    this.otherForm = this.otherForm.bind(this);
    this.uploadRedirect = this.uploadRedirect.bind(this);
    this.load = this.load.bind(this);
    this.historyRedirect = this.historyRedirect.bind(this);
  }

  componentDidMount() {
    if (this.props.history.action === 'REPLACE') {
      if(this.props.location["state"]["from"]["pathname"] === "/my_history") {
        this.setState({reRoute: "/my_history"})
      } else {
        this.props.redirectToUpload()
      }
    }
    if (this.state.formType != this.props.formType) {
      this.props.clearSessionErrors()
      this.setState({formType: this.props.formType})
    }
  }

  componentWillUnmount() {
    if (this.props.history.loaction !== '/signup' || this.props.history.loaction !== '/signup') {
      this.props.resetRedirect()
    }
  }

  updateUserName(e) {
    e.preventDefault();
    this.setState({username: e.currentTarget.value})
  }

  updatePassword(e) {
    e.preventDefault();
    this.setState({password: e.currentTarget.value})
  }

  demoLogin() {
    const demo = {username: "DemoUser", password: "123456"};
    if(this.state.reRoute === "/my_history") {
      this.props.login(demo).then(this.historyRedirect);
    } else if (this.props.history.action === 'REPLACE' || this.props.uploadRedirect) {
      this.props.login(demo).then(this.uploadRedirect);
    } else {
      this.props.login(demo);
    }
  }

  processInput() {
    let path;
    let {verifyUsername, formType, receiveSessionErrors, processForm, clearSessionErrors}  = this.props;
    formType === "login" ? path = "/signin" : path = "/signup"
    if (!this.state.userVerified) {
      verifyUsername({username: this.state.username, path: path }).then(
        username => {
          clearSessionErrors()
          this.setState({userVerified: true});
        },
        errors => {
          receiveSessionErrors(errors.responseJSON);
        }
      )
    } else {
      if(this.state.reRoute === "/my_history") {
        processForm({username: this.state.username, password: this.state.password}).then(this.historyRedirect)
      } else if(this.props.history.action === 'REPLACE' || this.props.uploadRedirect) {
        processForm({username: this.state.username, password: this.state.password}).then(this.uploadRedirect)
      } else {
        processForm({username: this.state.username, password: this.state.password})
      }
    }
  }

  otherForm() {
    let path;
    this.props.match.path === "/signin" ? path = "/signup" : path = "/signin"
    this.props.history.push(path);
  }

  uploadRedirect() {
    this.props.resetRedirect()
    this.props.history.push('/upload')
  }

  historyRedirect() {
    this.setState({reRoute: ""})
    this.props.history.push('/my_history')
  }

  load() {
    return null
  }

  render() {
    let { formType } = this.props;
    let otherformType;
    let otherformTypelink;
    let input;
    let loader;
    if (this.props.loading) {
      loader = <div className="session-loader"></div>
    } else {
      loader = <div className="session-loader-empty"></div>
    }
    !this.state.userVerified ? input = <input onInput={this.updateUserName} value={this.state.username} placeholder="Enter your username"></input> :
      input = <input onInput={this.updatePassword} type ="password"value={this.state.password} placeholder="Enter your password"></input>
    formType === "login" ? formType = "Sign In" : formType = "Sign Up"
    this.props.match.path === "/signin" ? otherformType = "Sign Up" : otherformType = "Sign In"
    this.props.match.path === "/signin" ? otherformTypelink = "/signup" : otherformTypelink = "/signin"

    return(
      <div className="sessionContainer">
        {loader}
          <div className="sessionForm">
            <div className="sessionForm-logo">
              <p>NewTube</p>
              <img id="nav-bar-logo" src={window.logo}></img>
            </div>

            <div className="sessionForm-instructions">
              <h1>{this.state.userVerified ? `Welcome,` : formType}</h1>
              <p>{ this.state.userVerified ? this.state.username : "to continue to NewTube"}</p>
            </div>


            <div className={this.props.errors[0] ? "sessionForm-input-errors" : "sessionForm-input"}>
              {input}
              <p className="error-messages">{this.props.errors[0]}</p>
            </div>

            <div className="sessionForm-buttons">
              <a onClick={this.otherForm}>{otherformType}</a>
              <button onClick={this.props.loading ? this.load : this.processInput}>Next</button>
            </div>

            <div className="sessionForm-demo">
              <button onClick={this.props.loading ? this.load : this.demoLogin}>Demo</button>
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(SessionForm);
