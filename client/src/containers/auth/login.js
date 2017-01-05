//======================
// IMPORT
//======================
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';



const form = reduxForm({
  form: 'login'
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
// LOGIN PAGE
//======================
class LoginPage extends Component {
  static contextTypes = {
    router: React.PropTypes.object
  }

  constructor(props) {
  super(props);
  this.state= {
    em: false,
    ps: false
  }
}

  componentWillMount() {
    this.props.clearErrors();
    this.props.initialize("");

    if(this.props.authenticated) {
      this.context.router.push('/dashboard');
    }
  }

  handleFormSubmit(formProps) {
    this.props.loginUser(formProps);
  }

  // display the header component

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      )
    }
  }

  renderMessage() {
    if (this.props.message) {
      return (
        <div>
          <strong>Success!</strong> {this.props.message}
        </div>
      )
    }
  }

  handleFieldActivate(field) {

    if(!this.props.formValues.login.values.email) {
      this.setState( { em: false } );
    };

    if(!this.props.formValues.login.values.password) {
      this.setState( { pw: false } );
    };

    switch (field) {
      case "em":
        this.setState( { em: true } );
        break;
      case "pw":
        this.setState( { pw: true } );
        break;
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <div className="frame container">
          <div className="content">
            <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

              <div className={`input_group ${this.state.em ? 'active' : ''}`}>
                <label>Email:</label>
                <Field onFocus={this.handleFieldActivate.bind(this, "em")} name="email" type="email" component={renderField}/>
              </div>


              <div className={`input_group ${this.state.pw ? 'active' : ''}`}>
                <label>Password:</label>
                <Field onFocus={this.handleFieldActivate.bind(this, "pw")} name="password" type="password" component={renderField}/>
              </div>

              <button action="submit" className="button submit_button">Login</button>

              <Link to="/forgotpassword">Forgot Password</Link>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message,
    authenticated: state.auth.authenticated ,
    formValues: state.form
  };
}

export default connect(mapStateToProps, actions)(form(LoginPage));
