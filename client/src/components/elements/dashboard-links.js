import React, { Component } from 'react';
import { Link } from 'react-router';
import cookie from 'react-cookie';

const cookieUser = cookie.load('user');

export default class navigationLinks extends Component {
  renderIcon() {
    switch (this.props.icon) {
      case "dashboard":
        return(<i class="material-icons">dashboard</i>)
        break;
      case "message":
        return(<i class="material-icons">message</i>)
        break;
      case "people":
        return(<i class="material-icons">people</i>)
        break;
      case "person":
        return(<i class="material-icons">person</i>)
        break;
      case "settings":
        return(<i class="material-icons">settings</i>)
        break;
      case "assignment":
        return(<i class="material-icons">assignment</i>)
        break;
      case "ticket":
        return(<i class="material-icons">receipt</i>)
        break;
      default:

    }
  }

  verifyLink() {
    if(this.props.exclusive == true) {
      if(cookieUser.profile.role == this.props.requiredRole) {
        return (
          <Link to={this.props.link} activeClassName="activeDashNav"><span>{this.renderIcon()}</span>{this.props.name}</Link>
        )        
      }
    } else {
      if(cookieUser.profile.role >= this.props.requiredRole) {
        return (
          <Link to={this.props.link} activeClassName="activeDashNav"><span>{this.renderIcon()}</span>{this.props.name}</Link>
        )
      }
    }
  }

  render() {
    return (
      <li key={this.props.name}>{this.verifyLink()}</li>
    )
  }
}
