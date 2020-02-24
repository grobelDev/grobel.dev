import React, { useState, useContext, Suspense } from 'react';
import styled from 'styled-components';
import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  // Switch,
  // Route
  Link
  // useParams,
  // useLocation,
  // Redirect,
  // useRouteMatch
} from 'react-router-dom';

import Articles from './ArticlePage';
import articleInfo from './articles/articleInfo.js';
import ErrorBoundary from './ErrorBoundary';

// import { fetchArticles } from './api';

import ResourceContext from './ResourceContext';

export default function ArticlesDirectory() {
  // const [resource, setResource] = useState(fetchDirectory());
  let articles = articleInfo();

  const resource = useContext(ResourceContext);
  // console.log(resource);
  // console.log(resource);
  // console.log(resource.directory.read());

  return (
    <div>
      <Layout>
        <PageTitle className='font-serif font-light leading-tight pb-4'>
          Articles
        </PageTitle>
        <ErrorBoundary fallback={<div>Error in retrieving directory!</div>}>
          <Suspense fallback={<div>Fetching articles...</div>}>
            <DirectoryWrapper resource={resource}></DirectoryWrapper>
          </Suspense>
        </ErrorBoundary>
        {/* <div className='text-xl'>
          {articles.map(article => {
            let title = article.title;
            let name = article.name;

            return (
              <li className='py-2' key={`${article.title}`}>
                <span className='text-blue-700'>
                  <Link to={`/articles/${name}`}> {`${title}`}</Link>
                </span>
              </li>
            );
          })}
        </div> */}
      </Layout>
    </div>
  );
}

function DirectoryWrapper({ resource }) {
  let results = resource.articles.read();
  let resultsArray = Object.entries(results);
  // console.log(resultsArray);

  return (
    <div>
      {/* <div>{JSON.stringify(re)}</div> */}
      <div>
        {resultsArray.map(fileArray => {
          let fileTitle = fileArray[1].attributes.title;
          let fileDescription = fileArray[1].attributes.description;
          let slug = fileArray[1].attributes.slug;

          return (
            <li className='py-2' key={`${fileTitle}`}>
              <Link to={slug}>
                <span className='text-xl text-blue-700'>{fileTitle}</span>
              </Link>
              <div>{fileDescription}</div>
            </li>
          );
        })}
      </div>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div>
      <div className='pt-24 lg:pt-0'>
        <div className='relative w-full max-w-screen-xl px-6 pt-16 pb-40 mx-auto md:pb-24'>
          <div className='-mx-6 xl:flex'>
            <div className='max-w-3xl px-6 mx-auto text-left '>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const PageTitle = styled.div`
  font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
  font-size: 2.5rem;
`;
