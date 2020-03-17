---
title: Express Node.js Server Starting Point
description: Starting point for a bare-bones server. Mostly for reference.
slug: express-starter
date: 2020-03-17 02:18:23
---

This creates a simple `Hello World` Express server configured with testing deployed on Google Cloud Run with continuous CI/CD from Google Cloud Build.

Most of the information here was referenced from:  
https://cloud.google.com/run/docs/quickstarts/build-and-deploy

### 1. Create the `server` directory

First, let's make the directory and `cd` into it.

```
mkdir server && cd $_
```

### 2. Create `package.json`

Now, let's setup our `package.json` file. This will let us easily install our dependencies later.

First, create the file:

```
touch package.json
```

Then, put this code inside it:

#### `package.json`:

```json
{
  "name": "express-server",
  "version": "1.0.0",
  "description": "Does server related things.",
  "author": "grobelDev",
  "scripts": {
    "test": "jest",
    "dev": "nodemon",
    "start": "node server.js"
  },
  "jest": {
    "testEnvironment": "node",
    "coveragePathIgnorePatterns": ["/node_modules/"]
  },
  "license": "Apache-2.0"
}
```

### 3. Install Dependencies

Now, let's install our dependencies:

```
npm install --save-dev express nodemon jest supertest
```

Let's also create a `.gitignore` file:

```
touch .gitignore
```

#### `.gitignore`:

```
# See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
/node_modules
/.pnp
.pnp.js

# testing
/coverage

# production
/build

# misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

npm-debug.log*
yarn-debug.log*
yarn-error.log*
```

### 4. Separate the `app` from the `server`

This is because we don't want our application listening to the port after testing.

Create the files:

```
touch app.js server.js
```

#### `app.js`:

```js
'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

module.exports = app;
```

#### `server.js`:

```js
const app = require('./app');

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('App is listening on port', port);
});
```

This setup means that we can start the server with `node server.js` and can also import `app.js` for testing.

### 5. Setup Testing with Jest

Now let's also set up testing.

Make the tests directory with:

```
mkdir tests
```

Then make a `sample.test.js` file with:

```
touch tests/sample.tests.js
```

#### `tests/sample.tests.js`:

```js
const request = require('supertest');
const app = require('../app.js');

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
```

If you now run the `npm test` command, you should now be able to see passing test cases.

### 6. Create `Dockerfile`

Time to containerize.

Now, let's create a Dockerfile:

```
touch Dockerfile
```

Put this code inside it.

#### `Dockerfile`:

```Dockerfile
# Use the official lightweight Node.js 12 image.
# https://hub.docker.com/_/node
FROM node:12-slim

# Create and change to the app directory.
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json AND package-lock.json are copied.
# Copying this separately prevents re-running npm install on every code change.
COPY package*.json ./

# Install production dependencies.
RUN npm install --only=production

# Copy local code to the container image.
COPY . ./

# Run the web service on container startup.
CMD [ "npm", "start" ]
```

### 7. Extra Exclusions (optional)

The following files are only necessary to make the container images smaller.

```
touch .dockerignore .gcloudignore
```

#### `.dockerignore`:

```
Dockerfile
README.md
node_modules
npm-debug.log
```

#### `.gcloudignore`:

```
README.md
node_modules
npm-debug.log
```

### 8. Setting up CI/CD with Google Cloud Build and Google Cloud Run

Now let's set up the CI/CD pipeline with a `cloudbuild.yaml` file.

First create the file:

```
cd .. &&
touch cloudbuild.yaml
```

Make sure to replace `<PROJECT NAME>` with whatever your actual project name is.

#### `cloudbuild.yaml`:

```yaml
steps:
  # build the container image
  - name: 'gcr.io/cloud-builders/docker'
    args: ['build', '-t', 'gcr.io/$PROJECT_ID/<PROJECT NAME>', './server']

    # push the container image to Container Registry
  - name: 'gcr.io/cloud-builders/docker'
    args: ['push', 'gcr.io/$PROJECT_ID/<PROJECT NAME>']

    # Deploy container image to Cloud Run
  - name: 'gcr.io/cloud-builders/gcloud'
    args:
      [
        'run',
        'deploy',
        '<PROJECT NAME>',
        '--image',
        'gcr.io/$PROJECT_ID/<PROJECT NAME>',
        '--region',
        'us-central1',
        '--platform',
        'managed',
        '--quiet',
        '--allow-unauthenticated',
      ]

images:
  - gcr.io/$PROJECT_ID/<PROJECT NAME>
```

And then, make sure to connect and push some changes to production using Google Cloud Build with Google Cloud Run.

If you want more specific details on that last step, check out the personal stack post that's located elsewhere on this website.

Thanks for reading.
