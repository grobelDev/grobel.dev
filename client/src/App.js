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
import Articles from './Articles';

function App() {
  return (
    <Fragment>
      <Navbar></Navbar>
      <Switch>
        <Route exact path='/'>
          <HomePage></HomePage>
        </Route>
        <Route path='/articles'>
          <Articles></Articles>
        </Route>
      </Switch>
    </Fragment>
  );
}

export default App;
