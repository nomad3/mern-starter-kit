import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import * as actions from '../actions';

class NavContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      windowWidth: window.innerWidth,
      scrollPosition: window.scrollTop,
      windowPosition: window.pageYOffset,
      navExpanded: false,
      narrowNav: false,
    };
  }

  //navigation links
  primaryNavigationLinks() {
    if(this.props.authenticated) {
      return [
        <ul key={"priKey"} onClick={this.handleNavClick.bind(this)}>
          <li key={200}><Link to="/">Home</Link></li>
          <li key={202}><Link to="/dashboard">Dashboard</Link></li>
          <li key={201}><a onClick={this.props.logoutUser.bind(this)}>Logout</a></li>
        </ul>
      ]
    } else {
      return [
        <ul key={"primKey"} onClick={this.handleNavClick.bind(this)}>
          <li key={200}><Link to="/">Home</Link></li>
          <li key={202}><Link to="/login">Login</Link></li>
          <li key={201}><Link to="/register">Register</Link></li>
        </ul>
      ];
    }
  }

  //component functions
  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    window.addEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize.bind(this));
    window.removeEventListener('scroll', this.handleScroll.bind(this));
  }

  componentWillReceiveProps(nextProps) {

  }

  //event handlers
  handleResize() {
    this.setState({windowWidth: window.innerWidth});
  }

  handleScroll() {
    this.setState({windowPosition: window.pageYOffset});
    this.setState({scrollPosition: document.body.scrollTop});

    if(this.state.windowPosition >= 150) {
      this.setState({narrowNav: true});
    } else {
      this.setState({narrowNav: false});
    }
  }

  handleNavClick() {
    if(!this.state.navExpanded) {
      this.setState({navExpanded: true});
    } else {
      this.setState({navExpanded: false});
    }
  }

  //render methods
  renderMobileNav() {
    if(this.state.navExpanded) {
      return this.primaryNavigationLinks();
    }
  }

  renderPrimaryNavigation() {
    if(this.state.windowWidth <= 1180) {
      return [
        <div key={102} className="mobile_links">
          <p onClick={this.handleNavClick.bind(this)}></p>
          {this.renderMobileNav()}
        </div>
      ];
    } else {
      return [
        <div key={103} className="primary_links">
          {this.primaryNavigationLinks()}
        </div>
      ];
    }
  }

  //component render
  render() {
    return (
      <div className={`${this.state.narrowNav ? 'shrink' : ''}`}>
        <div key={100} className={`primary_navigation_container ${this.state.secondNav ? 'half' : ''}`}>
          {this.renderPrimaryNavigation()}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps, actions)(NavContainer);
