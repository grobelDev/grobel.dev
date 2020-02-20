import React from 'react';
import styled from 'styled-components';

export default function App() {
  return (
    <Layout>
      <Favicon></Favicon>
      <Logo192></Logo192>
      <Logo512></Logo512>
    </Layout>
  );
}

function Layout({ children }) {
  return (
    <div className='px-48 py-24 m-auto bg-gray-100 border-2'>{children}</div>
  );
}

function Favicon() {
  return (
    <div className='pb-10'>
      <div className='text-4xl font-bold text-left text-blue-700'>
        Favicon.ico (64x64)
      </div>
      <div className='flex bg-white border-2'>
        <div className='p-6 bg-white'>
          <FaviconDefault className='text-5xl font-normal bg-blue-300'>
            T
          </FaviconDefault>
          <div className=''>Default</div>
        </div>
        <div className='p-6 bg-white'>
          <FaviconFarsan className='text-5xl font-semibold bg-blue-300'>
            <div className='mt-3'>T</div>
          </FaviconFarsan>
          <div className=''>Farsan</div>
        </div>
        <div className='p-6 bg-white'>
          <FaviconRasa className='text-5xl font-semibold bg-blue-300'>
            <div className='mt-1'>t</div>
          </FaviconRasa>
          <div className=''>Rasa</div>
        </div>
        <div className='p-6 bg-white'>
          <FaviconLato className='text-5xl font-bold bg-blue-300'>
            <div className='mb-1'>t</div>
          </FaviconLato>
          <div className=''>Lato</div>
        </div>
        <div className='p-6 bg-white'>
          <FaviconUbuntu className='text-5xl font-normal bg-blue-300'>
            <div className='mb-1'>t</div>
          </FaviconUbuntu>
          <div className=''>Ubuntu normal</div>
        </div>
        <div className='p-6 bg-white'>
          <FaviconUbuntu className='text-4xl font-normal bg-blue-300'>
            <div className='mb-1'>t</div>
          </FaviconUbuntu>
          <div className=''>Ubuntu normal 2</div>
        </div>
        <div className='p-6 bg-white'>
          <FaviconUbuntu className='text-5xl font-medium bg-blue-300'>
            <div className='mb-2'>a</div>
          </FaviconUbuntu>
          <div className=''>Ubuntu medium</div>
        </div>
        <div className='p-6 bg-white'>
          <FaviconUbuntu className='text-6xl font-medium bg-blue-300'>
            <div className='mb-2'>t</div>
          </FaviconUbuntu>
          <div className=''>Ubuntu medium 2</div>
        </div>
        <div className='p-6 m-2 bg-white border-2 border-green-300'>
          <FaviconUbuntu className='text-5xl font-semibold bg-blue-300 rounded-full'>
            <div className='mb-4'>g</div>
          </FaviconUbuntu>
          <div className=''>Ubuntu bold</div>
        </div>
      </div>
    </div>
  );
}

function Logo192() {
  return (
    <div className='pb-10'>
      <div className='text-4xl font-bold text-left text-blue-700'>
        Logo192.png (192x192)
      </div>
      <div className='flex bg-white border-2'>
        <div className='p-6 bg-white'>
          <FaviconUbuntuLogo192 className='text-5xl font-normal bg-blue-300'>
            <div className='mb-1'>t</div>
          </FaviconUbuntuLogo192>
          <div className=''>Ubuntu normal</div>
        </div>
        <div className='p-6 bg-white'>
          <FaviconUbuntuLogo192 className='text-4xl font-normal bg-blue-300'>
            <div className='mb-1'>t</div>
          </FaviconUbuntuLogo192>
          <div className=''>Ubuntu normal 2</div>
        </div>
        <div className='p-6 bg-white'>
          <FaviconUbuntuLogo192 className='text-5xl font-medium bg-blue-300'>
            <div className='mb-1'>t</div>
          </FaviconUbuntuLogo192>
          <div className=''>Ubuntu medium</div>
        </div>
        <div className='p-6 bg-white'>
          <FaviconUbuntuLogo192 className='text-6xl font-medium bg-blue-300'>
            <div className='mb-1'>t</div>
          </FaviconUbuntuLogo192>
          <div className=''>Ubuntu medium 2</div>
        </div>
        <div className='p-6 m-2 bg-white border-2 border-green-300'>
          <FaviconUbuntuLogo192 className='text-5xl font-bold bg-blue-300 rounded-full'>
            <div className='mb-1'>t</div>
          </FaviconUbuntuLogo192>
          <div className=''>Ubuntu bold</div>
        </div>
      </div>
    </div>
  );
}

function Logo512() {
  return (
    <div>
      <div className='text-4xl font-bold text-left text-blue-700'>
        Logo512.png (512x512)
      </div>
      <div className='p-6 bg-white border-2 border-green-300'>
        <FaviconUbuntuLogo512 className='text-5xl font-bold bg-blue-300 rounded-full'>
          <div className='mb-24'>g</div>
        </FaviconUbuntuLogo512>
        <div className=''>Ubuntu bold</div>
      </div>
    </div>
  );
}

export const FaviconDefault = styled.div`
  height: 64px;
  width: 64px;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

export const FaviconFarsan = styled.div`
  font-family: 'Farsan', cursive;
  height: 64px;
  width: 64px;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

export const FaviconRasa = styled.div`
  font-family: 'Rasa', serif;
  height: 64px;
  width: 64px;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

export const FaviconLato = styled.div`
  font-family: 'Lato', sans-serif;
  height: 64px;
  width: 64px;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
`;

export const FaviconUbuntu = styled.div`
  font-family: 'Ubuntu', sans-serif;
  height: 64px;
  width: 64px;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  // font-weight: 500;
`;

export const FaviconUbuntuLogo192 = styled.div`
  font-family: 'Ubuntu', sans-serif;
  height: 192px;
  width: 192px;
  border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  font-size: 7rem;
  // font-weight: 500;
`;

export const FaviconUbuntuLogo512 = styled.div`
  font-family: 'Ubuntu', sans-serif;
  height: 512px;
  width: 512px;
  // border-radius: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 1rem;
  font-size: 17rem;
  // font-weight: 500;
`;
