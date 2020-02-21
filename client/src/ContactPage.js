import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
// import ReactMarkdown from 'react-markdown';

import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  // Switch,
  // Route
  // Link,
  useParams
  // useLocation,
  // Redirect,
  // useRouteMatch
} from 'react-router-dom';

// import articleInfo from './articles/articleInfo.js';

export default function ContactPage() {
  //   const [content, setContent] = useState(null);
  //   const { name } = useParams();
  //   const [title, setTitle] = useState();
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
        <PageTitle className='font-serif font-light leading-tight pb-4'>
          Contact
        </PageTitle>
        <div className='text-xl'>
          <li>
            Email:{' '}
            <span className='text-blue-700'>
              <a href='mailto:grobelDev@gmail.com'>grobelDev@gmail.com</a>
            </span>
          </li>
          <li>
            Github:{' '}
            <span className='text-blue-700'>
              <a href='https://github.com/grobelDev' target='_blank'>
                grobelDev
              </a>
            </span>
          </li>
          <li>
            Twitter:{' '}
            <span className='text-blue-700'>
              <a href='https://twitter.com/grobelDev' target='_blank'>
                grobelDev
              </a>
            </span>
          </li>
          <li>
            LinkedIn:{' '}
            <span className='text-blue-700'>
              <a href='https://www.linkedin.com/in/grobeldev2/' target='_blank'>
                grobelDev
              </a>
            </span>
          </li>
        </div>

        {/* <PageTitle className='font-serif font-light leading-tight'> */}
        {/* {title} */}
        {/* </PageTitle> */}
        {/* <div className='py-8'>{dateCreated}</div> */}
        {/* <ReactMarkdown source={content} className='markdown-body' /> */}
      </Layout>
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
