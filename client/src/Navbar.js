import React from 'react';
import styled from 'styled-components';
import Logo from './logo.png';
import {
  // eslint-disable-next-line
  BrowserRouter as Router,
  // Switch,
  // Route
  Link,
  // useParams,
  // useLocation,
  // Redirect,
  // useRouteMatch
} from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='fixed inset-x-0 top-0 z-50 flex items-center min-w-0 bg-gray-100 border-b-2 border-gray-200 lg:border-b-0 lg:static'>
      <div className='relative w-full max-w-screen-xl px-6 mx-auto'>
        <div className='flex flex-col justify-center h-16 lg:border-b-2 lg:border-gray-200'>
          <div className='flex items-center -mx-6'>
            <div className='pl-6 pr-6 lg:w-1/4 xl:w-1/5'>
              <div className='flex items-center'>
                <a href='/' className='flex items-center'>
                  <img
                    className='w-auto h-8 pr-3'
                    src={Logo}
                    alt='grobelDev logo'
                  ></img>
                  <LogoText className='text-2xl text-gray-800 font-regular md:block'>
                    grobelDev
                  </LogoText>
                </a>
              </div>
            </div>
            <div className='flex justify-end flex-grow'>
              <div className='flex items-center justify-start px-6'>
                <div className='pr-6'>
                  <Link to='/contact'>Contact</Link>
                </div>
                <div>
                  <a href='https://grobel.dev'>Articles</a>
                </div>
                {/* <a
                href='https://github.com/actuharry'
                className='flex items-center block mr-5 text-gray-500 hover:text-gray-700'
              >
                <svg
                  className='w-5 h-5 fill-current'
                  viewBox='0 0 20 20'
                >
                  <path d='M10 0a10 10 0 0 0-3.16 19.49c.5.1.68-.22.68-.48l-.01-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.1-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.1.39-1.99 1.03-2.69a3.6 3.6 0 0 1 .1-2.64s.84-.27 2.75 1.02a9.58 9.58 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.37.2 2.4.1 2.64.64.7 1.03 1.6 1.03 2.69 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85l-.01 2.75c0 .26.18.58.69.48A10 10 0 0 0 10 0'></path>
                </svg>
              </a>
              <a
                href='https://twitter.com/actuharry'
                className='flex items-center block mr-5 text-gray-500 hover:text-gray-700'
              >
                <svg
                  className='w-5 h-5 fill-current'
                  viewBox='0 0 20 20'
                >
                  <path d='M6.29 18.25c7.55 0 11.67-6.25 11.67-11.67v-.53c.8-.59 1.49-1.3 2.04-2.13-.75.33-1.54.55-2.36.65a4.12 4.12 0 0 0 1.8-2.27c-.8.48-1.68.81-2.6 1a4.1 4.1 0 0 0-7 3.74 11.65 11.65 0 0 1-8.45-4.3 4.1 4.1 0 0 0 1.27 5.49C2.01 8.2 1.37 8.03.8 7.7v.05a4.1 4.1 0 0 0 3.3 4.03 4.1 4.1 0 0 1-1.86.07 4.1 4.1 0 0 0 3.83 2.85A8.23 8.23 0 0 1 0 16.4a11.62 11.62 0 0 0 6.29 1.84'></path>
                </svg>
              </a>
              <a
                href='https://www.linkedin.com/in/harrison-chung-8073b5197/'
                className='flex items-center block text-gray-500 hover:text-gray-700'
              >
                <svg
                  className='w-5 h-5 fill-current'
                  viewBox='0 0 24 24'
                >
                  <path d='M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z'></path>
                </svg>
              </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const LogoText = styled.p`
  font-family: 'Lato', sans-serif;
`;
