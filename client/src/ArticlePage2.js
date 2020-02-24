import React, {
  useState,
  useEffect,
  useContext,
  Suspense,
  Fragment
} from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  // Switch,
  // Route
  // Link,
  useParams
  // useLocation,
  // Redirect,
  //   useRouteMatch
} from 'react-router-dom';

import ErrorBoundary from './ErrorBoundary';
import ResourceContext from './ResourceContext';

export default function ArticlePage2() {
  const resource = useContext(ResourceContext);
  let { slug } = useParams();

  //   let match = useRouteMatch('/articles/:slug');

  //   console.log(match);
  //   console.log(slug);
  //   const { name } = useParams();
  //   const [title, setTitle] = useState();
  //   const [content, setContent] = useState(null);
  //   const [dateCreated, setDateCreated] = useState();

  //   useEffect(() => {
  //     const readmePath = require(`./articles/${name}.md`);
  //     const articleObject = articleInfo().find(article => article.name === name);
  //     setTitle(articleObject.title);
  //     setDateCreated(articleObject.dateCreated);

  //     fetch(readmePath)
  //       .then(response => {
  //         return response.text();
  //       })
  //       .then(text => {
  //         setContent(text);
  //       });
  //   }, []);

  return (
    <div>
      <Layout>
        <ErrorBoundary fallback={<div>Error in retrieving article!</div>}>
          <Suspense fallback={'Fetching article...'}>
            <ArticlePageWrapper
              resource={resource}
              slug={slug}
            ></ArticlePageWrapper>
          </Suspense>
        </ErrorBoundary>
      </Layout>
    </div>
  );
}

function ArticlePageWrapper({ resource, slug }) {
  //   const [title, setTitle] = useState();
  //   const [content, setContent] = useState(null);

  let results = resource.articles.read();
  let resultsArray = Object.entries(results);

  let article = resultsArray.find(article => {
    return article[1].attributes.slug === slug;
  });

  let articleData = article[1];

  let title = articleData.attributes.title;
  let description = articleData.attributes.description;
  let content = articleData.body;
  //   console.log(article);

  //   console.log(resultsArray);

  return (
    <Fragment>
      <ArticleTitle className='font-serif font-light leading-tight'>
        {title}
      </ArticleTitle>
      <div className='pt-6'>{description}</div>
      <ReactMarkdown source={content} className='markdown-body' />

      <div></div>
      {/* <div>{JSON.stringify(resultsArray)}</div> */}
    </Fragment>
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

const ArticleTitle = styled.div`
  font-family: Georgia, Cambria, 'Times New Roman', Times, serif;
  font-size: 2.5rem;
`;
