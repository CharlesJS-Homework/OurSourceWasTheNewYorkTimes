import React, { Component } from 'react';
import headerImg from '../header_img.jpg';

class Header extends Component {
  render() {
    return (
      <header className="main-header">
        <img className="header-img" src={ headerImg } alt="Our Source Was The New York Times" />
        <h1 className="header-h1">OUR SOURCE WAS THE NEW YORK TIMES.</h1>
      </header>
    );
  }
}

export default Header;
