import React, { Component } from 'react';
import axios from 'axios';

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = { title: props.title, date: props.date, url: props.url, id: props.id };
  }

  save = (event) => {
    event.preventDefault();

    const data = {
      title: this.state.title,
      date: this.state.date,
      url: this.state.url,
      _id: this.state.id
    };

    axios.post('/api/articles', data);
  }

  render() {
    return (
      <li>
        <a href={ this.state.url }>{ this.state.title }</a>
        <button onClick={ this.save }>Save</button>
      </li>
    );
  }
}

export default Result;
