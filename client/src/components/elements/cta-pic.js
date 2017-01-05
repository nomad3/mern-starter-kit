//====================
// IMPORT
//====================
import React, { Component } from 'react';
import { Link } from 'react-router';

//icons
import CheckMark from 'react-icons/lib/io/checkmark';
import Heart from 'react-icons/lib/io/heart';
import Gear from 'react-icons/lib/io/gear-a';
import Settings from 'react-icons/lib/io/settings';
import Email from 'react-icons/lib/io/email';
import Phone from 'react-icons/lib/io/android-call';
import Coffee from 'react-icons/lib/io/coffee';
import Monitor from 'react-icons/lib/io/monitor';
import Planet from 'react-icons/lib/io/planet';
import Leaf from 'react-icons/lib/io/leaf';
import FireBall from 'react-icons/lib/io/fireball';
import Speedometer from 'react-icons/lib/io/speedometer';
import Money from 'react-icons/lib/io/social-usd';
import ReactIcon from 'react-icons/lib/io/social-nodejs';
import Sass from 'react-icons/lib/io/social-sass';
import Html from 'react-icons/lib/io/social-html5';
import GitHub from 'react-icons/lib/io/social-github';
import Facebook from 'react-icons/lib/io/social-facebook';
import Twitter from 'react-icons/lib/io/social-twitter';
import LinkedIn from 'react-icons/lib/io/social-linkedin';
import WordPress from 'react-icons/lib/io/social-wordpress';
import Css from 'react-icons/lib/io/social-css3';
import Javascript from 'react-icons/lib/io/social-javascript';


//====================
// CTA PIC
//====================

export default class ctaPic extends Component {

  // determine the icon
  returnIcon() {
    switch (this.props.icon) {
      case "Checkmark": return (<Checkmark />);
      case "Heart": return (<Heart />);
      case "Gear": return (<Gear />);
      case "Settings": return (<Settings />);
      case "Email": return (<Email />);
      case "Phone": return (<Phone />);
      case "Coffee": return (<Coffee />);
      case "Monitor": return (<Monitor />);
      case "Planet": return (<Planet />);
      case "Leaf": return (<Leaf />);
      case "FireBall": return (<FireBall />);
      case "Speedometer": return (<Speedometer />);
      case "ReactIcon": return (<ReactIcon />);
      case "Sass": return (<Sass />);
      case "Html": return (<Html />);
      case "GitHub": return (<GitHub />);
      case "Facebook": return (<Facebook />);
      case "Twitter": return (<Twitter />);
      case "LinkedIn": return (<LinkedIn />);
      case "WordPress": return (<WordPress />);
      case "Javascript": return (<Javascript />);
      case "Css": return (<Css />);
      default: return ("");
    }
  }

  returnTitle() {
    if(this.props.title) {
      return (
        <div>
          <h5> {this.props.title} </h5>
        </div>
      )
    }
  }

  returnContent() {
    if(this.props.content) {
      return (
        <div>
          <p> {this.props.content} </p>
        </div>
      )
    }
  }

  renderIcon() {
     if(this.props.router) {
        return ( <Link to={this.props.href}> {this.returnIcon()} </Link> )
      } else {
        return ( <a href={this.props.href} target={this.props.target} rel={this.props.rel}> {this.returnIcon()} </a> );
      }
  }

  render() {
    return (
      <div className="cta-pic">
        {this.renderIcon()}
        {this.returnTitle()}
        {this.returnContent()}
      </div>
    )
  }
}
