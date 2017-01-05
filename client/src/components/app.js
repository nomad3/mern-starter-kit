//=================
// IMPORT
//=================
import React, { Component } from "react";
import Navigation from './navigation';
import Footer from './footer';

//=================
// PRIMARY APP COMPONENT
//=================
export default class App extends Component {
  render() {
    return (
      <div className="page_container">
        <div className="nav_container">
          <Navigation pathName={this.props.location.pathname}/>
        </div>
        <div>{this.props.children}</div>
        <Footer />
      </div>
    );
  }
}
