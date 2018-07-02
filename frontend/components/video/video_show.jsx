import React from 'react';
import { Link } from 'react-router-dom';

class VideoShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      
    }
  }
  componentDidMount() {
    this.props.requestSingleVideo(this.props.match.params.id)
    window.scrollTo(0, 0)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.video && (this.props.video.id != nextProps.match.params.id)) {
      this.props.requestSingleVideo(nextProps.match.params.id);
    }
  }

  render() {
    let {video} = this.props;
    if (!video) {
      return null;
    }
      return(
        <section className="video-show-container" id='body'>
        	<section className="video-player-container col col-2-3">
            <nav className="video-container">
              <video
                className="video-player"
                src={video.video_url}
                />
            </nav>
              <h1>{video.title}</h1>
        	</section>
        	<section className="col col-1-3">
  					<ul className="opinions-list">
  						<li>Torvalds: When I Was Almost Wrong</li>
  						<li>Knuth: Art of Programming</li>
  						<li>Lovelace: The First Algorithm</li>
  						<li>Hopper: The First Bug</li>
  						<li>Thompson: Go C Unix</li>
  						<li>Carmack: My Virtual Reality</li>
  						<li>Stallman: Free Speech Not Free Coffee</li>
  					</ul>
    			</section>
        </section>
      )
    }
  }


export default VideoShow;
