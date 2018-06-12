import React from 'react';
import { Link } from 'react-router-dom';

class VideoIndex extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
      return(
        <div>
          <video width="320" height="240" controls>
            <source src={window.movie} type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
        </div>
      )
    }
  }


export default VideoIndex;
