//=================
// IMPORT
//=================
import React, { Component } from 'react';
import { Link } from 'react-router';

export default class button extends Component {
  // determine the link type
  returnLink() {
    if(this.props.router) {
      return ( <Link className="button" to={this.props.href}>{this.props.link}</Link> )
    } else {
      return ( <a className="button" href={this.props.href} target={this.props.target} rel={this.props.rel}> {this.props.link} </a> );
    }
  }

  // render the button
  render() {
    return (
      this.returnLink()
    );
  }
}
