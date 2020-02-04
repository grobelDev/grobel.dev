import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

export default function Articles() {
  const [content, setContent] = useState(null);

  useEffect(() => {
    const readmePath = require('./articles/cra-tailwind-purgecss.md');

    fetch(readmePath)
      .then(response => {
        return response.text();
      })
      .then(text => {
        setContent(text);
      });
  }, []);

  return (
    <div>
      <Layout>
        <ArticleTitle className='font-serif font-light leading-tight'>
          Setup Tailwind with Purgecss in Create-React-App
        </ArticleTitle>
        <div className='py-8'>Created on Sun Feb 02 01:48 PM.</div>
        <ReactMarkdown source={content} className='markdown-body' />
      </Layout>
    </div>
  );
}

function Layout({ children }) {
  return (
    <div>
      <div className='pt-24 lg:pt-0'>
        <div className='relative w-full px-6 pt-16 pb-40 mx-auto max-w-screen-xl md:pb-24'>
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
