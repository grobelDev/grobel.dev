This is my personal stack when starting a new project.  
I value having a flexible starting point and getting everything up and running as fast as possible.

There are two parts:

- Section 1: Front-End (React + Tailwind)
- Section 2: CI/CD - Google Cloud Build and Google Cloud Run

I hope you find this helpful.

## Section 1: Front-End (React + Tailwind):

### Step 1: Setup the initial repository.

In my case, I tend to call the React side of my projects as `client`.

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
npm audit fix
```

As an optional step, take out some of the boilerplate `create-react-app` files:

```
rm src/App.test.js src/App.css src/index.css src/logo.svg src/serviceWorker.js
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

import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
```

### Step 6: Verify Installation

Done! Everything should be setup now.

Let's use some `Tailwind` to verify that everything installed properly.

#### `App.js`:

```js
import React from 'react';

export default function App() {
  return (
    <div className='text-4xl font-bold text-center text-blue-500'>
      Hello World
    </div>
  );
}
```

## CI/CD - Google Cloud Build and Google Cloud Run

For `Cloud Run` to see the files, we have to setup `nginx` in the React project.

We'll do this by making a directory and a `nginx.conf` file:

```
mkdir nginx &&
touch ./nginx/nginx.conf
```

Then, put this code in `default.conf`:

```conf
server {
  listen 8080;

  location / {
    root /usr/share/nginx/html;
    try_files $uri /index.html;
  }
}
```

Now, we need to setup the `Dockerfile` image we're going to build with `Cloud Build` and deploy to `Cloud Run`.

Create a `Dockerfile` file:

```
touch Dockerfile
```

Put this code in `Dockerfile`:

```Dockerfile
FROM node:alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx
EXPOSE 8080
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/build /usr/share/nginx/html
```

This script tells our `CI/CD` to build a production version of our website, then to use `nginx` as a reverse proxy to serve these files over the internet.

Essentially, `nginx` deals with the ports and routing to our React app.

Now, the image built from this `Dockerfile` should run fine on `Cloud Run`, but we're to setup a separate pipeline to automatically build and deploy our image to production with every commit. Continuous delivery, in other words.

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

Now put this code inside it.

`cloudbuild.yaml`:

```yaml
steps:
  # build the container images
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/client', './client']
  # - name: 'gcr.io/cloud-builders/docker'
  #   args: ['build', '-t', 'gcr.io/$PROJECT_ID/server', './server']

  # push the container images to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/client']
  # - name: 'gcr.io/cloud-builders/docker'
  # args: ['push', 'gcr.io/$PROJECT_ID/server']

  # Deploy container images to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      [
        'run',
        'deploy',
        'client',
        '--image',
        'gcr.io/$PROJECT_ID/client',
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
  - gcr.io/$PROJECT_ID/client
  # - gcr.io/$PROJECT_ID/server
```

If you follow the formatting listed here, it should be possible to grok the syntax of this file.

I left in some commented out code to demonstrate what it would look like to have multiple build images in a single repository.

The naming for this hypothetical image is `server`.

Note that this configuration doesn't do anything until you actually connect your `Github` repository to a cooresponding Google Cloud project.

Projects are the general umbrella for where your CI/CD and deployment will live together.

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

## Steps to setup with Google Cloud:

### 1. Create project on Google Cloud.

### 2. Enable relevant APIs.

Enable the `Google Cloud Run API` for your project.  
Enable the `Google Cloud Build API` for your project.

### 3. Setup `Google Cloud Build`

Go to the `trigger` tab on your project's `Google Cloud Build` page.

Use your `Github` account to authenticate and connect your repository to the project.

Setup a `push trigger` to build your app and push to production on every commit.

### 4. Give `Google Cloud Build` relevant permissions.

Go to the `settings` tab in `Google Cloud Build`.

You'll see settings for `Service Account Permissions`.

Make sure that the `Cloud Run admin` permission is set to `ENABLED`.

### 5. Deploy

Commit your project and push to master.
You should see your project live in a couple of minutes with an autogenerated `https://run.app` URL.

### 6. Deploy again.

Commit a trivial change and push to master again.
Wait a couple of minutes, and you should see the updated changes live in your URL.

You can check the progress of the deployment (and any errors that might have occured) in the `Google Cloud Build` page in your project.
