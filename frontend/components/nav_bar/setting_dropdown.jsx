import React from 'react';
import { Link } from 'react-router-dom';

class SettingDropDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      nightMode: false
    }
    this.toggleNightMode = this.toggleNightMode.bind(this)
  }

  toggleNightMode(e) {
    this.setState({nightMode: !this.state.nightMode})
  }

  render() {
  return(
      <div id="night-mode" className="setting-drop-down-container">
        <ul id="night-mode" onClick={this.handleClick} className="setting-drop-down">

            <li id="night-mode" className="drop-down-list-item">
              <div id="night-mode">
                <section className={this.state.nightMode ? "night-mode-icon" : "hidden"}id="night-mode">
                  <i id="night-mode" className="fas fa-moon"></i>
                </section>

                <section className={!this.state.nightMode ? "night-mode-icon" : "hidden"}id="night-mode">
                  <i className="fas fa-sun"></i>
                </section>

                <nav className="night-mode-text" id="night-mode">Night Mode</nav>
              </div>


              <button className="night-mode-bttn" onClick={this.toggleNightMode} id="night-mode">
                <p id="night-mode" className={this.state.nightMode ? "" : "hidden"}>
                  ON
                </p>

                <p id="night-mode" className={!this.state.nightMode ? "" : "hidden"}>
                  OFF
                </p>
              </button>

              </li>
        </ul>
      </div>
    )
  }
};

export default SettingDropDown;
