import React from 'react';
import { Route, IndexRoute } from 'react-router';

//base pages
import App from './components/app';
import NotFoundPage from './containers/notfound';

//static pages
import HomePage from './containers/homepage';

//dashboard pages
import DashboardPage from './containers/dashboard/dashboard';

//auth pages
import LoginPage from './containers/auth/login';
import RegisterPage from './containers/auth/register';
import LogoutPage from './containers/auth/logout';
import ForgotPasswordPage from './containers/auth/forgot_password';
import ResetPasswordPage from './containers/auth/reset_password';

//high order components
import RequireAuth from './components/middleware/require_auth';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={HomePage} />

    {/*static routes*/}

    {/*dashboard routes*/}
    <Route path="dashboard" component={RequireAuth(1, DashboardPage)} />

    {/*auth routes*/}
    <Route path="login" component={LoginPage} />
    <Route path="logout" component={LogoutPage} />
    <Route path="register" component={RegisterPage} />
    <Route path="forgotpassword" component={ForgotPasswordPage} />
    <Route path="resetpassword/:resetToken" component={ResetPasswordPage} />

    {/*404 routes*/}
    <Route path="*" component={NotFoundPage} />
  </Route>
);
