import React, { Fragment } from 'react';

export default function articleInfo() {
  const articles = [
    {
      name: 'cra-tailwind-purgecss',
      title: 'Setup Tailwind with Purgecss in Create-React-App',
      dateCreated: 'Created on Sun Feb 02 01:48 PM.'
    },
    {
      name: 'personal-stack',
      title:
        'Setup Beginning Project Point (React + Tailwind) - (Google Cloud Build + Google Cloud Run) - Continuous CI/CD',
      dateCreated: 'Created on Mon Jan 27 01:09 PM.'
    }
  ];

  return articles;
}
