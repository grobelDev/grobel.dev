import React, { useState, Suspense } from 'react';
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

import { fetchDirectory } from './api';

export default function ArticlesDirectory() {
  const [resource, setResource] = useState(fetchDirectory());
  let articles = articleInfo();

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
        <div className='text-xl'>
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
        </div>
      </Layout>
    </div>
  );
}

function DirectoryWrapper({ resource }) {
  // let titles = resource
  // console.log('directory:', resource.directory.read());
  let directoryResource = resource.directory.read();

  // console.log(Object.entries(directoryResource));

  let directoryArray = Object.entries(directoryResource);

  // for (let [key, value] of Object.entries(directoryResource)) {
  // console.log(`${key}: ${value}`);
  // }

  return (
    <div>
      {/* <div>{JSON.stringify(directoryResource)}</div> */}
      <div>
        {directoryArray.map(fileArray => {
          let fileTitle = fileArray[1].title;
          let fileDescription = fileArray[1].description;

          return (
            <li className='py-2' key={`${fileArray[1].title}`}>
              <span className='text-xl text-blue-700'>{fileTitle}</span>
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
