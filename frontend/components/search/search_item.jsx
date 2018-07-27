import React from 'react';
import { Link } from 'react-router-dom';

class SearchItem extends React.Component {
  constructor(props) {
    super(props)
    this.state = {

    }
  }

  render() {
    let { el } = this.props;
    let destination;
    let text;
    if(el.name) {
      destination = `/apps/${el.id}`
      text = el.name
    } else if (el.username) {
      destination = `/channel/${el.id}`
      text = el.username
    } else {
      destination = `/video/${el.id}`
      text = el.title
    }
    return(
      <Link to={destination}>
        <li>
          {text}
        </li>
      </Link>
    )

  }

};

export default SearchItem;
