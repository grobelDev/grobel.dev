import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);
const useMountEffect = fun => useEffect(fun, []);

export default function HomePage() {
  const myRef = useRef(null);
  const isInitialMount = useRef(true);

  useMountEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      scrollToRef(myRef);
    }
  });

  return (
    <div>
      <div>
        <div id='header'>
          <div className='pt-24 bg-gray-100 lg:pt-0'>
            <div className='relative w-full px-6 pt-16 pb-40 mx-auto max-w-screen-xl md:pb-24'>
              <div className='-mx-6 xl:flex'>
                <div className='max-w-2xl px-6 mx-auto text-left md:text-center xl:text-left md:max-w-3xl'>
                  <h1 className='text-3xl font-light leading-tight sm:text-4xl md:text-5xl xl:text-4xl'>
                    Hello, I'm Harrison. <br></br>
                    <span className='font-normal text-blue-500 sm:block'>
                      A Full Stack Developer.
                    </span>
                  </h1>
                  <p className='mt-6 leading-relaxed text-gray-600 sm:text-lg md:text-xl xl:text-lg'>
                    I am a recent graduate of the Fullstack Flex bootcamp at
                    Thinkful. <br></br>I believe in maintainable code and in
                    doing my part against spaghetti code. <br></br>
                    When I'm not coding, I'm often found Indoors or Near
                    Electricity.
                    <br></br>There is always more spaghetti.
                  </p>
                  {/* <p className="mt-6 leading-relaxed text-gray-600 sm:text-lg md:text-xl xl:text-lg">
              I believe in maintanable code and in doing my part against
              spaghetti code.
            </p> */}
                  <div
                    onClick={() => scrollToRef(myRef)}
                    className='flex justify-start mt-6 md:justify-center xl:justify-start'
                  >
                    <button className='px-4 py-3 font-semibold leading-tight text-white bg-blue-500 rounded-lg shadow-md md:px-5 xl:px-4 md:py-4 xl:py-3 hover:bg-blue-600 md:text-lg xl:text-base'>
                      See Projects
                    </button>
                    {/* onClick={()=>scrollToRef(myRef) */}
                  </div>
                </div>
              </div>
            </div>
            <hr className='my-8 border-b-2 border-gray-200'></hr>
          </div>
        </div>
      </div>
      <div className='w-full px-6 mx-auto max-w-screen-xl'>
        <div className='-mx-6 lg:flex'>
          <div
            id='sidebar'
            className='fixed inset-0 hidden w-full h-full pt-24 -mb-16 bg-gray-100 border-b z-90 lg:-mb-0 lg:static lg:h-auto lg:bg-transparent lg:overflow-y-visible lg:border-b-0 lg:pt-0 lg:w-1/4 lg:block lg:border-0 xl:w-1/5'
          >
            <div
              id='navWrapper'
              className='h-full overflow-hidden overflow-y-auto scrolling-touch bg-gray-100 lg:h-auto lg:block lg:relative lg:sticky lg:top-0 lg:bg-transparent'
            >
              <div
                id='navGradient'
                className='absolute inset-x-0 z-10 hidden h-16 pointer-events-none lg:block'
              ></div>
              <nav
                id='nav'
                className='px-6 pt-6 overflow-y-auto text-base lg:text-sm lg:py-12 lg:pl-6 lg:pr-8 sticky?lg:h-screen'
              >
                <div className='mb-8'>
                  <h5 className='mb-3 text-sm font-bold tracking-wide text-gray-500 uppercase lg:mb-2 lg:text-xs'>
                    Projects
                  </h5>
                  <AnimatedA
                    // eslint-disable-next-line no-script-url
                    href='javascript:void(0);'
                    onClick={() => scrollToRef(myRef)}
                    className='relative flex block px-2 py-1 -mx-2 font-medium text-gray-600 transition-fast hover:translate-r-2px hover:text-gray-900'
                  >
                    <img
                      className='w-auto h-6 pr-1'
                      src='https://i.imgur.com/2mdtBD3.png'
                      alt='actuharryIcon'
                    ></img>
                    <p className='flex flex-col justify-center'>
                      Grobel - Chrome Extension
                    </p>
                  </AnimatedA>
                </div>
              </nav>
            </div>
          </div>
          <div
            id='content-wrapper'
            className='w-full min-h-screen lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5'
          >
            <div id='content'>
              <div id='app' className='flex'>
                <div ref={myRef} className='w-full pt-24 pb-16 lg:pt-28'>
                  <div className='max-w-3xl px-6 mx-auto mb-6 markdown lg:ml-0 lg:mr-auto xl:mx-0 xl:px-12 xl:w-3/4'>
                    <h1 className='text-3xl font-light'>
                      Grobel - Chrome Extension
                    </h1>
                    <div className='mt-0 mb-4 text-gray-600'>
                      A Discord Webhook Companion.
                    </div>
                    <hr className='my-8 border-b-2 border-gray-200'></hr>
                    <img
                      src='https://cdn.discordapp.com/attachments/636565266356240394/648592273214275604/screenshot.png'
                      alt='grobelExtensionImage'
                    ></img>
                    <div className='flex flex-grow w-full max-w-3xl px-6 mx-auto markdown xl:px-12 lg:ml-0 lg:mr-auto xl:mx-0 xl:w-3/4'></div>
                  </div>
                  <div className='flex'>
                    <div className='w-full max-w-3xl px-6 mx-auto markdown xl:px-12 lg:ml-0 lg:mr-auto xl:mx-0 xl:w-3/4'>
                      <p>
                        Grobel is a simple one-click method for sharing websites
                        + screenshots to Discord featuring whitelist and
                        blacklist functionality, so you can be selective about
                        what you share. <br></br>
                        <br></br>It also includes an 'Auto-Grobel' feature, so
                        you can automatically track personalized histories with
                        screenshot context.
                      </p>
                      <br></br>
                      <p>Grobel it! </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const AnimatedA = styled.a`
  transform: translate(0px, 0px);
  transition-duration: 0.2s;
  :hover {
    transform: translate(2px, 0px);
  }
`;
