//=========================
// IMPORT
//=========================

import React, { Component } from 'react';
import ReactIcon from 'react-icons/lib/io/social-nodejs';
import SassIcon from 'react-icons/lib/io/social-sass';
import HtmlIcon from 'react-icons/lib/io/social-html5';
import GitHubIcon from 'react-icons/lib/io/social-github';
import FacebookIcon from 'react-icons/lib/io/social-facebook';
import TwitterIcon from 'react-icons/lib/io/social-twitter';
import LinkedInIcon from 'react-icons/lib/io/social-linkedin';
import GooglePlus from 'react-icons/lib/io/social-googleplus';

export default class socialIcons extends Component {

  render() {
    return (
      <div key={1007} className="social_links">
        <ul>
          <li key={1013}><a href="http://bit.ly/1TTcBgR" target="_blank"><GitHubIcon /></a></li>
          <li key={1014}><a href="http://bit.ly/1TTnn6K" target="_blank"><FacebookIcon /></a></li>
          <li key={1011}><a href="http://bit.ly/1Tdh5oy" target="_blank"><TwitterIcon /></a></li>
          <li key={1012}><a href="http://bit.ly/1Nw3INX" target="_blank"><LinkedInIcon /></a></li>
          <li key={1015}><a href="http://bit.ly/1Tkommx" target="_blank"><GooglePlus /></a></li>
        </ul>
      </div>
    )
  }
}
