import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import Results from './Results';

const queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json';
const apiKey = "b9f91d369ff59547cd47b931d8cbc56b:0:74623931";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { topic: '', start: '', end: '', results: [] };
  }

  searchParams() {
    const params = { "api-key": apiKey };
    
    const { topic, start, end } = this.state;

    if (topic && topic.length !== 0) {
      params.q = topic;
    }

    if (parseInt(start, 10)) {
      params.begin_date = `${start}0101`;
    }

    if (parseInt(end, 10)) {
      params.end_date = `${end}0101`;
    }

    return params;
  }

  search() {
    return axios.get(queryURL, { params: this.searchParams() })
      .then(result => result.data.response.docs.map((eachItem) => {
        console.log(eachItem);
        const title = eachItem.headline.main;
        const dateString = eachItem.pub_date;
        const url = eachItem.web_url;
        const id = eachItem._id;
          
        moment.locale('en');
        const time = dateString ? moment(dateString) : moment();
        const date = time.toDate();
  
        return {
          title, date, url, id,
        };
      }));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();

    this.search().then(results => this.setState({ results }));
  }

  render() {
    return (
      <div>
        <form className="search-form article-box" onSubmit={ this.handleSubmit }>
          <h2>Search</h2>
          <hr />
          <label htmlFor="topic">Topic</label>
          <input type="text" name="topic" value={ this.state.topic } onChange={ this.handleChange } /><br />
          <label htmlFor="start">Start Year</label>
          <input type="text" name="start" value={ this.state.start } onChange={ this.handleChange } /><br />
          <label htmlFor="end">End Year</label>
          <input type="text" name="end" value={ this.state.end } onChange={ this.handleChange }/><br />
          <input type="submit" value="Search" />
        </form>
        { this.state.results.length !== 0 ? <Results results={this.state.results} /> : <div></div> }
      </div>
    );
  }
}

export default Search;
