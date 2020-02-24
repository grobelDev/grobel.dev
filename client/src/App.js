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
import ArticlePage2 from './ArticlePage2';
import ContactPage from './ContactPage';
import { fetchArticles } from './api';

import ResourceContext from './ResourceContext';

// const ResourceContext = React.createContext(fetchDirectory());

function App() {
  return (
    <Fragment>
      <Navbar></Navbar>
      <ResourceContext.Provider value={fetchArticles()}>
        <Switch>
          <Route exact path='/'>
            <HomePage></HomePage>
          </Route>
          <Route exact path='/articles'>
            <ArticlesDirectory></ArticlesDirectory>
          </Route>
          <Route path='/contact'>
            <ContactPage></ContactPage>
          </Route>
          {/* <Route path='/articles/:name'>
            <ArticlePage></ArticlePage>
          </Route> */}
          <Route path='/:slug'>
            <ArticlePage2></ArticlePage2>
          </Route>
          <Route path='/'>404 Error!</Route>
        </Switch>
      </ResourceContext.Provider>
    </Fragment>
  );
}

export default App;
