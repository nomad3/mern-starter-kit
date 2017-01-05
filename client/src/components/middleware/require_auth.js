import React, { Component } from 'react';
import { connect } from 'react-redux';
import cookie from 'react-cookie';

const cookieUser = cookie.load('user');

export default function(role, ComposedComponent) {
  class Authentication extends Component {
    static contextTypes = {
      router: React.PropTypes.object
    }

    componentWillMount() {
      if(!this.props.authenticated) {
        this.context.router.push('/login');
      }

      if(cookieUser.profile.role < role ) {
        this.context.router.push('/dashboard');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.authenticated) {
        this.context.router.push('/login');
      }

      if(cookieUser.profile.role < role ) {
        this.context.router.push('/dashboard');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { authenticated: state.auth.authenticated };
  }

  return connect(mapStateToProps)(Authentication);
}
