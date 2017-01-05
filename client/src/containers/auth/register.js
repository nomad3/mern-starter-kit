//======================
// IMPORT
//======================
import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';

const form = reduxForm({
  form: 'register',
  validate
});

const renderField = field => (
    <div>
      <div className="input_container">
        <input {...field.input}/>
      </div>
      {field.touched && field.error && <div className="error">{field.error}</div>}
    </div>
);

//======================
// REGISTER PAGE
//======================
class RegisterPage extends Component {
  constructor(props) {
  super(props);
  this.state= {
    fn: false,
    ln: false,
    em: false,
    pw: false,
    cp: false
  }
}

  componentWillMount() {
    this.props.initialize("");
  }

  handleFormSubmit(formProps) {
    this.props.registerUser(formProps);
  }

  handleFieldActivate(field) {

    if(!this.props.formValues.register.values.firstName) {
      this.setState( { fn: false } );
    };

    if(!this.props.formValues.register.values.lastName) {
      this.setState( { ln: false } );
    };

    if(!this.props.formValues.register.values.email) {
      this.setState( { em: false } );
    };

    if(!this.props.formValues.register.values.password) {
      this.setState( { pw: false } );
    };

    if(!this.props.formValues.register.values.passwordConfirm) {
      this.setState( { cp: false } );
    };

    switch (field) {
      case "fn":
        this.setState( { fn: true } );
        break;
      case "ln":
        this.setState( { ln: true } );
        break;
      case "em":
        this.setState( { em: true } );
        break;
      case "pw":
        this.setState( { pw: true } );
        break;
      case "cp":
        this.setState( { cp: true } );
        break;
    }
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

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="frame container">
          <div className="content">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

              <div className={`input_group ${this.state.fn ? 'active' : ''}`}>
                <label>First Name:</label>
                <Field onFocus={this.handleFieldActivate.bind(this, "fn")} type="text" name="firstName" component={renderField} />
              </div>

              <div className={`input_group ${this.state.ln ? 'active' : ''}`}>
                <label>Last Name:</label>
                <Field onFocus={this.handleFieldActivate.bind(this, "ln")} type="text" name="lastName" component={renderField} />
              </div>

              <div className={`input_group ${this.state.em ? 'active' : ''}`}>
                <label>Email:</label>
                <Field onFocus={this.handleFieldActivate.bind(this, "em")} type="email" name="email" component={renderField} />
              </div>

              <div className={`input_group ${this.state.pw ? 'active' : ''}`}>
                <label>Password:</label>
                <Field onFocus={this.handleFieldActivate.bind(this, "pw")} type="password" name="password" component={renderField} />
              </div>

              <div className={`input_group ${this.state.cp ? 'active' : ''}`}>
                <label>Confirm Password:</label>
                <Field onFocus={this.handleFieldActivate.bind(this, "cp")} type="password" name="passwordConfirm" component={renderField} />
              </div>

              {this.renderAlert()}
              <button action="submit" className="button submit_button">Register!</button>
            </form>
          </div>
        </div>
      </div>

    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name';
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name';
  }

  if (!formProps.email) {
    errors.email = 'Please enter an email';
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm) {
    errors.passwordConfirm = 'Please confirm password';
  }

  if (formProps.password !== formProps.passwordConfirm) {
    errors.password = 'Passwords must match';
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    authenticated: state.auth.authenticated,
    formValues: state.form
  };
}

export default connect(mapStateToProps, actions)(form(RegisterPage));
