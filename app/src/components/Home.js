import React, { Component } from 'react';
import Search from './Search';
import Saved from './Saved';

class Home extends Component {
  render() {
    return (
      <div>
        <Search />
        <Saved />
      </div>
    );
  }
}

export default Home;
