---
title: Express Node.js Server Starting Point
description: Starting point for a bare-bones server. Mostly for reference.
slug: express-starter
date: 2020-03-17 02:18:23
---

This creates a simple hello world Express server deployed on Google Cloud Run with continuous CI/CD from Google Cloud Build.

Most of the information here was referenced from:  
https://cloud.google.com/run/docs/quickstarts/build-and-deploy

## Setup

First, let's make the directory and `cd` into it.

```
mkdir server && cd $_
```

Now, let's setup our `package.json` file. This will let us easily install our dependencies later.

First, create the file:

```
touch package.json
```

Then, put this code inside it:

#### `package.json`

```json
{
  "name": "express app",
  "version": "1.0.0",
  "description": "Does server related things.",
  "author": "grobelDev",
  "scripts": {
    "dev": "nodemon",
    "start": "node server.js"
  },
  "license": "Apache-2.0",
  "dependencies": {
    "express": "^4.16.4",
    "nodemon": "^2.0.2"
  }
}
```

If you look at the `scripts` section, we have a `start` command. This command requires the existence of a `server.js` file to actually run our application.

So, let's do that.

Create the file:

```
touch server.js
```

Then put this boilerplate inside it:

```js
'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('Hello world received a request.');

  const target = process.env.TARGET || 'World';
  res.send(`Hello ${target}!`);
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log('Hello world listening on port', port);
});
```

Now, let's create a Dockerfile:

```
touch Dockerfile
```

Put this code inside it.

#### `Dockerfile`

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

### Exclusions (optional)

The following files are only necessary to make the container images smaller.

#### `.dockerignore`

```
Dockerfile
README.md
node_modules
npm-debug.log
```

#### `.gcloudignore`

```
README.md
node_modules
npm-debug.log
```

Now let's set up the CI/CD pipeline with a `cloudbuild.yaml` file.

First create the file:

```
cd .. &&
touch cloudbuild.yml
```

Make sure to replace `<PROJECT NAME>` with whatever your actual project name is.

#### `cloudbuild.yaml`

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
