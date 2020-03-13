---
title: Current Personal Starting Point for Web Development
description: (Last updated 2020-03-12 - YYYY-MM-DD) This is more for personal reference, but this is currently my starting point whenever I start creating a website.
slug: current-starting-point
---

This is my personal stack when starting a new project.  
I value having a flexible starting point and getting everything up and running as fast as possible.

There are two parts:

- Section 1: Front-End (React + Tailwind)
- Section 2: CI/CD - Google Cloud Build and Google Cloud Run

I hope you find this helpful.

## Section 1: Front-End (React + Tailwind):

React:

- React Router

CSS:

- Tailwind with PurgeCSS
- Styled Components

### Step 1: Setup the initial repository.

In my case, I tend to call the React side of my projects `client`.

```
mkdir client && cd $_
```

### Step 2: Install the necessary packages.

```
npx create-react-app ./ &&
npm install tailwindcss postcss-cli autoprefixer --save-dev &&
npx tailwind init &&
npm install -D @fullhuman/postcss-purgecss &&
npm install --save styled-components &&
npm install react-router-dom &&
npm audit fix
```

As an optional step, take out some of the boilerplate `create-react-app` files:

```
rm src/App.test.js src/App.css src/index.css src/logo.svg src/serviceWorker.js src/setupTests.js
```

### Step 3: Create Configuration Files

Let's create some empty configuration files.

- `./postcss.config.js`
- `./src/css/tailwind.src.css`

Create these files with:

```
touch postcss.config.js &&
mkdir -p ./src/css &&
touch ./src/css/tailwind.src.css
```

### Step 4: Setup Configuration Files

Let's put some code into those files.

#### `./postcss.config.js`:

```js
const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./src/**/*.jsx', './src/**/*.js', './public/index.html'],
  css: ['./src/tailwind.css'],
  // Include any special characters you're using in this regular expression
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
});

module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    ...(process.env.NODE_ENV === 'production' ? [purgecss] : [])
  ]
};
```

#### `./src/css/tailwind.src.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Step 5: Final Setup

In `package.json`, replace the default `scripts` section:

#### `./package.json`:

```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
    "start:css": "postcss src/css/tailwind.src.css -o src/tailwind.css",
    "build:css": "postcss src/css/tailwind.src.css -o src/tailwind.css --env production",
    "prestart": "npm run start:css",
    "prebuild": "npm run build:css"
  },
```

In `/src/index.js`, replace the default code to use our generated `tailwind.css` file:

#### `./src/index.js`:

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './tailwind.css';

import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
```

This will also implement routing for the application.

### Step 6: Verify Installation

Done! Everything should be setup now.

Let's use some `Tailwind` to verify that everything installed properly.

#### `App.js`:

```js
import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
  // Link,
  // useParams,
  // useLocation,
  // Redirect,
  // useRouteMatch
} from 'react-router-dom';

export default function App() {
  return (
    <Fragment>
      <Switch>
        <Route exact path='/'>
          <div>Welcome to the HomePage</div>
        </Route>

        <Route path='/'>
          <div>404 Error!</div>
        </Route>
      </Switch>
    </Fragment>
  );
}
```

## Section 2: CI/CD - Google Cloud Build and Google Cloud Run

### Step 2: Setup `nginx`

For `Cloud Run` to see the files, we have to setup `nginx` in the React project.

We'll do this by making a directory and a `default.conf` file:

```
mkdir nginx &&
touch ./nginx/default.conf
```

Then, put this code in the `default.conf`:

#### default.conf

```conf
server {
  listen 8080;

  location / {
    root /usr/share/nginx/html;
    try_files $uri /index.html;
  }
}
```

### Step 3: Setup `Dockerfile`

Now, we need to setup the `Dockerfile` image we're going to build with `Cloud Build` and deploy to `Cloud Run`.

Create a `Dockerfile` file:

```
touch Dockerfile
```

Put this code in the `Dockerfile`:

```Dockerfile
FROM node:latest as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
ENV NODE_ENV=production
RUN npm install --production
COPY . .
RUN npm run build

FROM nginx
EXPOSE 8080
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
```

The `Dockerfile` tells `Google Cloud Build` how to build the production version of our website, then to use `nginx` as a reverse proxy to serve these files over the internet.

Essentially, `nginx` deals with the ports and routing to our React app.

Now, the image built from this `Dockerfile` should run fine on `Cloud Run`, but we're to setup a separate pipeline to automatically build and deploy our image to production with every commit. Continuous integration and delivery, in other words.

The `Dockerfile` contains a set of instructions on _how_ to build our container image.

But, we still need additional instructions to tell `Google Cloud Build` _where_ to store it and _what_ it's for.

So let's start by creating a `cloudbuild.yaml` file.
For organization purposes, let's make this file at the root level of our project (as our project is currently inside a folder).

Navigate to the root of your project:

```
cd ..
```

Then create `cloudbuild.yaml`:

```
touch cloudbuild.yaml
```

Now put this code inside it. Replace all instances of `react-google-cloud-run` with the desired name of your own project.

`cloudbuild.yaml`:

```yaml
steps:
    # build the container images
    - name: 'gcr.io/cloud-builders/docker'
      args: ['build', '-t', 'gcr.io/$PROJECT_ID/react-google-cloud-run', './client']
    # - name: 'gcr.io/cloud-builders/docker'
    #   args: ['build', '-t', 'gcr.io/$PROJECT_ID/server', './server']

    # push the container images to Container Registry
    - name: 'gcr.io/cloud-builders/docker'
      args: ['push', 'gcr.io/$PROJECT_ID/react-google-cloud-run']
    # - name: 'gcr.io/cloud-builders/docker'
    # args: ['push', 'gcr.io/$PROJECT_ID/server']

    # Deploy container images to Cloud Run
    - name: 'gcr.io/cloud-builders/gcloud'
      args:
        [
          'run',
          'deploy',
          'react-google-cloud-run',
          '--image',
          'gcr.io/$PROJECT_ID/react-google-cloud-run',
          '--region',
          'us-central1',
          '--platform',
          'managed',
          '--quiet',
          '--allow-unauthenticated',
        ]
    # - name: 'gcr.io/cloud-builders/gcloud'
    #   args:
    #     [
    #       'run',
    #       'deploy',
    #       'server',
    #       '--image',
    #       'gcr.io/$PROJECT_ID/server',
    #       '--region',
    #       'us-central1',
    #       '--platform',
    #       'managed',
    #       '--quiet',
    #     ]
  images:
    - gcr.io/$PROJECT_ID/react-google-cloud-run
    # - gcr.io/$PROJECT_ID/server
```

You should be able to simply copy and paste the above code for your own project.

The instructions say to look in the `./client` directory for the requested files and create an image called `react-google-cloud-run` project from the files there.

I left in some commented out code to demonstrate what it would look like to have multiple build images in a single repository.

Note that this configuration doesn't actually do anything until you connect your `Github` repository to a corresponding Google Cloud `Project`.

`Projects` are the general umbrella term for how resources are siloed off from each other in Google Cloud.

### Optional Step:

Let's also create a `.gcloudignore` file to make sure our images aren't larger than they need to be.

We'll have to make sure that this file is back inside the `client` directory.

Create `.gcloudignore`:

```
touch ./client/.gcloudignore
```

Put this code inside it:

```
.git
dist
node_modules
vendor
*.jar
```
