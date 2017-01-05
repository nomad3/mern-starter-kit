import * as actions from '../../actions';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import Helmet from 'react-helmet';
import React, { Component } from 'react';

const form = reduxForm({
  form: 'reset',
  validate
});

const renderField = field => (
    <div>
      <input className="form-control" {...field.input}/>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

class ResetPasswordPage extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  metaData() {
    return (
      <Helmet
        title="reset PRE-ALPHA EVENT HORIZON"
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

  handleFormSubmit({ password }) {
    const resetToken = this.props.params.resetToken;
    this.props.resetPassword( resetToken, { password } );
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    } else if (this.props.message) {
      return (
        <div>
          <strong>Success!</strong> {this.props.message}
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
              <label>New Password:</label>
              <Field name="password" type="password" component={renderField} />

              <label>Confirm New Password:</label>
              <Field name="passwordConfirm" type="password" component={renderField} />

              {this.renderAlert()}

              <button action="submit">Change Password</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.password) {
    errors.password = 'Please enter a new password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm new password';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error, message: state.auth.resetMessage };
}

export default connect(mapStateToProps, actions)(form(ResetPasswordPage));
