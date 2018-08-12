import React, { Component } from 'react';
import Result from './Result';

class Results extends Component {
  constructor(props) {
    super(props);

    this.state = { results: props.results };
  }

  render() {
    return (
      <div className="article-box">
        <h2>Results</h2>
        <hr />
        <ul>
          { this.state.results.map(result => <Result
            key={result.id}
            title={result.title}
            date={result.date}
            url={result.url}
            id={result.id}
          />) }
        </ul>
      </div>
    );
  }
}

export default Results;
