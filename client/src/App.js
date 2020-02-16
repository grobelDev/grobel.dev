import React, { Fragment } from 'react';
// import styled from 'styled-components';
import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  Switch,
  Route
  // Link,
  // useParams,
  // useLocation,
  // Redirect,
  // useRouteMatch
} from 'react-router-dom';

import Navbar from './Navbar';
import HomePage from './HomePage';
import ArticlesDirectory from './ArticlesDirectory';
import ArticlePage from './ArticlePage';

function App() {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Switch>
        <Route exact path='/'>
          <HomePage></HomePage>
        </Route>
        <Route exact path='/articles'>
          <ArticlesDirectory></ArticlesDirectory>
        </Route>
        <Route path='/articles/:name'>
          <ArticlePage></ArticlePage>
        </Route>
        <Route path='/'>404 Error!</Route>
      </Switch>
    </Fragment>
  );
}

export default App;
