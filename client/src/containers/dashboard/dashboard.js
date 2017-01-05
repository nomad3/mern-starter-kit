//======================
// IMPORT
//======================
import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import cookie from 'react-cookie';
import * as actions from '../../actions';
import Helmet from 'react-helmet';

const cookieUser = cookie.load('user');

//======================
// HOME PAGE
//======================
class DashboardPage extends Component {
  componentDidMount() {
    this.props.fetchUser(cookieUser._id);
  }

  render() {
    return (
      <div className="frame container">
        <div className="content">
          Dashboard goes here.
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    content: state.auth.content,
    user: state.user
  };
}

export default connect(mapStateToProps, actions)(DashboardPage);
