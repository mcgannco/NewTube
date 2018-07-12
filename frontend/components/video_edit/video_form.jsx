import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class VideoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formType: "",
    };
  }

  render() {
    let { formType, video } = this.props;
    return(
      <div>
        <h1>video form</h1>
      </div>
    )
  }
}

export default withRouter(VideoForm);
