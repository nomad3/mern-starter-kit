//=================
// IMPORT DEPENDENCIES
//=================
import React, { Component } from 'react';
import Button from './button';

//=================
// CALL TO ACTION BOX COMPONENT
//
// <CtaBox
//   key=""
//   icon=""
//   title=""
//   image={[require('../assets/img/#')]}
//   content=""
//   href=""
//   link=""
//   target=""
//   router={true/false}
// />
//=================
export default class ctaBox extends Component {

  //render image if available
  renderImage() {
    if(this.props.image) {
      return(<img className="cta_image" src={this.props.image} />);
    }
  }

  //render button if available
  renderButton() {
    if(this.props.link) {
      return (
        <div>
          <Button
            icon={this.props.icon}
            href={this.props.href}
            link={this.props.link}
            target={this.props.target}
            router={this.props.router}
          />
        </div>
      );
    }
  }

  //render title if available
  renderTitle() {
    if(this.props.title) {
      return(<h4>{this.props.title}</h4>);
    }
  }

  //render content if available
  renderContent() {
    if(this.props.content) {
      return(<p>{this.props.content}</p>);
    }
  }

  //render component
  render() {
    return (
      <div key={this.props.key} className="cta_box">
        {this.renderTitle()}
        {this.renderImage()}
        {this.renderContent()}
        {this.renderButton()}
      </div>
    );
  }
}
