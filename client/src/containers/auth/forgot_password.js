import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Helmet from 'react-helmet';
import React, { Component } from 'react';

const form = reduxForm({
  form: 'forgot'
});

const renderField = field => (
    <div>
      <input className="form-control" {...field.input}/>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

class ForgotPasswordPage extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  metaData() {
    return (
      <Helmet
        title="forgot PRE-ALPHA EVENT HORIZON"
        meta={[
          {"name":"description", "content":"Hello world"},
          {"name":"keywords", "content":"something fun"}
        ]}
      />
    )
  }

  componentWillMount() {
    if(this.props.authenticated) {
      this.context.router.push('/');
    }
  }

  componentWillUpdate(nextProps) {
    if(nextProps.authenticated) {
      this.context.router.push('/');
    }
  }

  handleFormSubmit({ email }) {
    this.props.getForgotPasswordToken({ email });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  returnHeader() {
    return (
      <div className="header_container">

      </div>
    );
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        {this.metaData()}
        {this.returnHeader()}
        <div className="page_body">
          <div className="forms">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <label>Email:</label>
              <Field type="email" name="email" component={renderField} />

              {this.renderAlert()}
              <button action="submit">Reset Password</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(form(ForgotPasswordPage));
