import React, { Component } from 'react';
import axios from 'axios';
import openSocket from 'socket.io-client';

const socket = openSocket();

class Saved extends Component {
  constructor(props) {
    super(props);
    this.state = { articles: [] };
    
    this.reload();
    socket.on('dbChanged', this.reload);
  }

  reload = () => {
    axios.get('/api/articles').then(articles => this.setState({ articles: articles.data }));
  }

  removeHandler(event) {
    event.preventDefault();
    
    axios.delete(`/api/articles/${event.target.getAttribute('articleid')}`);
  }

  render() {
    if (this.state.articles.length === 0) {
      return <div></div>;
    }

    return (
      <div className="article-box">
        <h2>Saved Articles</h2>
        <hr />
        <ul>
          {
            this.state.articles.map(eachArticle => <li key={ eachArticle._id }>
              <a href={ eachArticle.url }>{ eachArticle.title }</a>
              <button articleid={ eachArticle._id } onClick={ this.removeHandler }>Remove</button>
            </li>)
          }
        </ul>
      </div>
    );
  }
}

export default Saved;
