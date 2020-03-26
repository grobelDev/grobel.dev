import React, { useRef, useEffect } from 'react';
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

const scrollToRef = ref => window.scrollTo(0, ref.current.offsetTop);
const useMountEffect = fun => useEffect(fun, []);

export default function HomePage() {
  const grobelRef = useRef(null);
  const firstRef = useRef(null);
  const secondRef = useRef(null);

  const isInitialMount = useRef(true);

  useMountEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
    } else {
      scrollToRef(grobelRef);
      scrollToRef(firstRef);
      scrollToRef(secondRef);
    }
  });

  return (
    <div>
      <div>
        <div id='header'>
          <div className='pt-24 bg-gray-100 lg:pt-0'>
            <div className='relative w-full max-w-screen-xl px-6 pt-16 pb-40 mx-auto md:pb-24'>
              <div className='-mx-6 xl:flex'>
                <div className='max-w-2xl px-6 mx-auto text-left md:text-center xl:text-left md:max-w-3xl'>
                  <h1 className='text-3xl font-light leading-tight sm:text-4xl md:text-5xl xl:text-4xl'>
                    Hello, I'm Harrison. <br></br>
                    <span className='font-normal text-blue-500 sm:block'>
                      A Full Stack Developer.
                    </span>
                  </h1>
                  <p className='mt-6 leading-relaxed text-gray-600 sm:text-lg md:text-xl xl:text-lg'>
                    I believe in maintainable code and in doing my part against
                    spaghetti code. <br></br>
                    When I'm not coding, I'm often found Indoors or Near
                    Electricity.
                    <br></br>
                    Currently looking for a team of like-minded developers.{' '}
                    <br></br>There is always more spaghetti.
                  </p>

                  <div
                    onClick={() => scrollToRef(firstRef)}
                    className='flex justify-start mt-6 md:justify-center xl:justify-start'
                  >
                    <button className='px-4 py-3 font-semibold leading-tight text-white bg-blue-500 rounded-lg shadow-md md:px-5 xl:px-4 md:py-4 xl:py-3 hover:bg-blue-600 md:text-lg xl:text-base'>
                      See Projects
                    </button>
                    {/* onClick={()=>scrollToRef(grobelRef) */}
                  </div>
                </div>
              </div>
            </div>
            <hr className='my-8 border-b-2 border-gray-200'></hr>
          </div>
        </div>
      </div>
      <div className='w-full max-w-screen-xl px-6 mx-auto'>
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
                    onClick={() => scrollToRef(firstRef)}
                    className='relative flex block px-2 py-1 -mx-2 font-medium text-gray-600 transition-fast hover:translate-r-2px hover:text-gray-900'
                  >
                    {/* <img
                      className='w-auto h-6 pr-1'
                      src='https://i.imgur.com/2mdtBD3.png'
                      alt='grobelDevIcon'
                    ></img> */}
                    <p className='flex flex-col justify-center'>
                      whenshouldileave.com
                    </p>
                  </AnimatedA>

                  <AnimatedA
                    // eslint-disable-next-line no-script-url
                    href='javascript:void(0);'
                    onClick={() => scrollToRef(secondRef)}
                    className='relative flex block px-2 py-1 -mx-2 font-medium text-gray-600 transition-fast hover:translate-r-2px hover:text-gray-900'
                  >
                    {/* <img
                      className='w-auto h-6 pr-1'
                      src='https://i.imgur.com/2mdtBD3.png'
                      alt='grobelDevIcon'
                    ></img> */}
                    <p className='flex flex-col justify-center'>
                      leagueofcomrades.com
                    </p>
                  </AnimatedA>
                  <AnimatedA
                    // eslint-disable-next-line no-script-url
                    href='javascript:void(0);'
                    onClick={() => scrollToRef(grobelRef)}
                    className='relative flex block px-2 py-1 -mx-2 font-medium text-gray-600 transition-fast hover:translate-r-2px hover:text-gray-900'
                  >
                    <img
                      className='w-auto h-6 pr-1'
                      src='https://i.imgur.com/2mdtBD3.png'
                      alt='grobelDevIcon'
                    ></img>
                    <p className='flex flex-col justify-center'>
                      Grobel - Chrome Extension
                    </p>
                  </AnimatedA>
                </div>
              </nav>
            </div>
          </div>
          <Content
            grobelRef={grobelRef}
            firstRef={firstRef}
            secondRef={secondRef}
          ></Content>
        </div>
      </div>
    </div>
  );
}

function Content({ children, grobelRef, firstRef, secondRef }) {
  return (
    <div
      id='content-wrapper'
      className='w-full min-h-screen lg:static lg:max-h-full lg:overflow-visible lg:w-3/4 xl:w-4/5'
    >
      <div id='content'>
        <ContentBlock
          myRef={firstRef}
          title='whenshouldileave.com - Find the Best Time to Leave'
          description='Find the best time to leave
          with the lowest traffic.'
          githubUrl='https://github.com/grobelDev/whenshouldileave.com'
          projectUrl='https://whenshouldileave.com'
          imageUrl='https://cdn.discordapp.com/attachments/636565266356240394/680036593066573874/screenshot.png'
          imageAlt='When Should I Leave Project Screenshot'
        >
          <p>
            'When Should I Leave' will give you an hour by hour breakdown of
            traffic.. <br></br>
            <br></br>Driving is better with the road to yourself.
          </p>
          <br></br>
        </ContentBlock>
        <ContentBlock
          myRef={secondRef}
          title='leagueofcomrades.com - Match History Between Friends'
          description='Find detailed breakdowns of player specific match histories in League of Legends.'
          githubUrl='https://github.com/grobelDev/leagueofcomrades.com'
          projectUrl='https://leagueofcomrades.com'
          imageUrl='https://cdn.discordapp.com/attachments/636565266356240394/680035312667459617/screenshot.png'
          imageAlt='League of Comrades Project Screenshot'
        >
          <p>
            Look up your comrades and see who they play the most with in League
            of Legends. <br></br>
            <br></br>Find detailed breakdowns of player specific match
            histories.
          </p>
          <br></br>
        </ContentBlock>
        <ContentBlock
          myRef={grobelRef}
          title='Grobel - Send Screenshots to Discord'
          description='A Chrome Extension that lets you send screenshots to Discord without a Bot.'
          githubUrl='https://github.com/grobelDev/grobel-v1-chrome-extension'
          projectUrl='https://chrome.google.com/webstore/detail/grobel-discord-webhook-co/eeobebgelloiljapehlibobeapgmoanl?hl=en'
          imageUrl='https://cdn.discordapp.com/attachments/636565266356240394/680047056428990464/screenshot.png'
          imageAlt='grobelExtensionImage'
        >
          <p>
            Grobel is a simple one-click method for sharing websites +
            screenshots to Discord featuring whitelist and blacklist
            functionality, so you can be selective about what you share.{' '}
            <br></br>
            <br></br>It also includes an 'Auto-Grobel' feature, so you can
            automatically track personalized histories with screenshot context.
          </p>
          <br></br>
          <p>Grobel it! </p>
        </ContentBlock>
        <ContentBlockTemp
          title='coronavirusmango.com'
          description='A website that aims to give relevant information for preventative measures for COVID-19.'
          // githubUrl='https://github.com/grobelDev/grobel-v1-chrome-extension'
          projectUrl='https://coronavirusmango.com'
          imageUrl='https://cdn.discordapp.com/attachments/661839525089116193/692676358081347654/screenshot.png'
          imageAlt='coronavirusmangoImage'
        >
          <p>
            This website aims to provide meaningful information for the Wuhan
            Coronavirus (2019-nCoV).
          </p>
          <br></br>
        </ContentBlockTemp>
        {/* <ContentBlock
          myRef={grobelRef}
          title='Grobel - Send Screenshots to Discord'
          description='A Chrome Extension that lets you send screenshots to Discord without a Bot.'
          githubUrl='https://github.com/grobelDev/grobel-v1-chrome-extension'
          projectUrl='https://chrome.google.com/webstore/detail/grobel-discord-webhook-co/eeobebgelloiljapehlibobeapgmoanl?hl=en'
          imageUrl='https://cdn.discordapp.com/attachments/636565266356240394/680047056428990464/screenshot.png'
          imageAlt='grobelExtensionImage'
        >
          <p>
            Grobel is a simple one-click method for sharing websites +
            screenshots to Discord featuring whitelist and blacklist
            functionality, so you can be selective about what you share.{' '}
            <br></br>
            <br></br>It also includes an 'Auto-Grobel' feature, so you can
            automatically track personalized histories with screenshot context.
          </p>
          <br></br>
          <p>Grobel it! </p>
        </ContentBlock> */}
        <ContentBlockTemp
          title='viteramen.com mockup'
          description='A reimagined website for https://viteramen.com.'
          // githubUrl='https://github.com/grobelDev/grobel-v1-chrome-extension'
          projectUrl='https://viteramen-zxc6fpw5uq-uc.a.run.app/'
          imageUrl='https://cdn.discordapp.com/attachments/661839525089116193/692677207734222919/screenshot.png'
          imageAlt='viteramenImage'
        >
          <p>A mockup for viteramen.com</p>
          <br></br>
        </ContentBlockTemp>
      </div>
    </div>
  );
}

function ContentBlock({
  myRef,
  children,
  title,
  description,
  githubUrl,
  projectUrl,
  imageUrl,
  imageAlt
}) {
  return (
    <div id='app' className='flex'>
      <div ref={myRef} className='w-full pt-24 pb-16 lg:pt-28'>
        <div className='max-w-3xl px-6 mx-auto mb-6 markdown lg:ml-0 lg:mr-auto xl:mx-0 xl:px-12 xl:w-3/4'>
          <h1 className='text-3xl font-light'>{title}</h1>
          <div className='mt-0 mb-4 text-gray-600'>{description}</div>

          <hr className='my-8 border-b-2 border-gray-200'></hr>

          <div className='rounded-lg shadow-lg'>
            <a href={projectUrl} target='_blank'>
              <img src={imageUrl} alt={imageAlt}></img>
            </a>
          </div>

          <div className='flex flex-grow w-full max-w-3xl px-6 mx-auto markdown xl:px-12 lg:ml-0 lg:mr-auto xl:mx-0 xl:w-3/4'></div>
        </div>
        <div className='flex'>
          <div className='w-full max-w-3xl px-6 mx-auto markdown xl:px-12 lg:ml-0 lg:mr-auto xl:mx-0 xl:w-3/4'>
            <div>
              <a className='text-blue-700' href={githubUrl} target='_blank'>
                Link to Github Repo.
              </a>
            </div>
            <br></br>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContentBlockTemp({
  // myRef,
  children,
  title,
  description,
  githubUrl,
  projectUrl,
  imageUrl,
  imageAlt
}) {
  return (
    <div id='app' className='flex'>
      <div className='w-full pt-24 pb-16 lg:pt-28'>
        <div className='max-w-3xl px-6 mx-auto mb-6 markdown lg:ml-0 lg:mr-auto xl:mx-0 xl:px-12 xl:w-3/4'>
          <h1 className='text-3xl font-light'>{title}</h1>
          <div className='mt-0 mb-4 text-gray-600'>{description}</div>

          <hr className='my-8 border-b-2 border-gray-200'></hr>

          <div className='rounded-lg shadow-lg'>
            <a href={projectUrl} target='_blank'>
              <img src={imageUrl} alt={imageAlt}></img>
            </a>
          </div>

          <div className='flex flex-grow w-full max-w-3xl px-6 mx-auto markdown xl:px-12 lg:ml-0 lg:mr-auto xl:mx-0 xl:w-3/4'></div>
        </div>
        <div className='flex'>
          <div className='w-full max-w-3xl px-6 mx-auto markdown xl:px-12 lg:ml-0 lg:mr-auto xl:mx-0 xl:w-3/4'>
            <div>
              <a className='text-blue-700' href={githubUrl} target='_blank'>
                Link to Github Repo.
              </a>
            </div>
            <br></br>
            {children}
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
