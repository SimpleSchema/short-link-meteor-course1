import React from 'react';
import {Meteor} from 'meteor/meteor';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import PropTypes from 'prop-types';
import { Tracker } from 'meteor/tracker';



import Login from '../ui/Login.js'
import Signup from '../ui/Signup.js';
import Link from '../ui/Link.js';
import NotFound from '../ui/NotFound.js';

const history = createHistory();
const unauthenticatedPages = ['/', '/signup'];
const authenticatedPages = ['/links'];
const onEnterPublicPage = () => {
  if (Meteor.userId()){
    history.replace('/links');
  }
};
const onEnterPrivatePage = () => {
  if (!Meteor.userId()){
    history.replace('/');
  }
};

export const onAuthChange = (isAuthenticated) => {
  const pathname = history.location.pathname;
  const isUnauthenticatedPage = unauthenticatedPages.includes(pathname);
  const isAuthenticatedPage = authenticatedPages.includes(pathname);

  if (isUnauthenticatedPage && isAuthenticated) {
    history.replace('/links');
  } else if (isAuthenticatedPage && !isAuthenticated) {
    history.replace('/');
  }
}

export const routes = (
  <Router history={history}>
    <Switch>
        <Route path="/" component={Login} exact={true} onEnter={onEnterPublicPage} />
        <Route path="/signup" component={Signup} onEnter={onEnterPublicPage} />
        <Route path="/links" component={Link} onEnter={onEnterPrivatePage} />
        <Route path="*" component={NotFound} />
    </Switch>
  </Router>

);
