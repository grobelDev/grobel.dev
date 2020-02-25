---
title: Setup Google Cloud Run with Create-React-App and Continuous CI/CD via Google Cloud Build at Virtually Zero Cost
description: Learn how to setup Google Cloud Run with a containerized Create-React-App application complete with a continuous CI/CD pipeline that triggers a Google Cloud Build pipeline on every Github commit. At virtually zero cost.
slug: react-cloud-run
---

## The End Result

Project URL:  
https://react-google-cloud-run-zxc6fpw5uq-uc.a.run.app/

Repository:  
https://github.com/grobelDev/react-google-cloud-run

After completing the following steps, you should have a website with SSL certificates (that is, using `https://`) hosted on a public `run.app` URL for virtually free.

The website will also only use compute resources proportional to the number of users for the website.

That is, if there is only one user, only one container should be temporarily spun up to send the requested HTML/CSS files. If there are many users, or even a sudden influx of users (as in, your website goes viral), then an appropriate amount of containers (up to 1,000 simultaneously) should be dynamically spun up to meet the demand without significant impact to user experience.

Also, if there are zero users, then no compute resources will be used at all, and costs will be zeroed.

Current costs of using `Google Cloud Run` can be found here:  
https://cloud.google.com/run/pricing

As of the time of writing (Feb 23, 2019), the free tier that Google offered covered 2 million requests per month.

---

After setup, this is what a workflow should look like:

1. `Commit` and `Push` some code changes to a Github repository.
2. `Google Cloud Build` gets automatically alerted, and starts building a container image to host on Google Cloud. This is the step where tests and compatibility checks are run.
3. This new container image will be pushed to `Google Cloud Run`, and the earlier code changes will be immediately reflected on the website.

This process of having code immediately pushed to the live website is also known as 'Continuous CI/CD' (Continuous Integration / Continuous Deployment).

Current costs of using `Google Cloud Build` can be found here:
https://cloud.google.com/cloud-build/pricing

As of the time of writing (Feb 23, 2019), the free tier that Google offered covered 120 build-minutes per day.

---

## Instructions

Let's get to it.

### Step 0: Prerequisites

We will be making use of Google Cloud. To make use of these services, we will need an account. Accounts require some form of payment, so a credit card is necessary for initial activation.

Activation of a new Google Cloud account will give you \$300 worth of free credits that expire in a year, which will be more than sufficent for this tutorial.

You will also need a Github account and a local version of Git on your computer.

You will also need a local copy of `Node.js` on your computer. I would suggest the LTS version.

### Step 1: Setup `create-react-app`.

Initialize a new git directory.

Inside this folder, make a directory to hold your project.

In my case, I tend to call the React side of my projects `client`.

```
mkdir client && cd $_
```

Now, let's install the base application.

```
npx create-react-app ./
```

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

Now put this code inside it.

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

If you follow the formatting listed here, it should be possible to grok the syntax of this file.

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

## Setup Google Cloud

### 1. Create a `Project` on Google Cloud.

As stated earlier, `Projects` are the general umbrella term for how resources are siloed off from each other in Google Cloud.

For our first step, create a new `Project` in the `Google Cloud Console`.

This is also where we are going to be configuring the project.

### 2. Enable relevant APIs.

API's must first be enabled before being available to use in your project.

Use the search bar at the top to find and activate the relevant API's.

Enable the `Cloud Run API` for your project (Search Term: `Cloud Run`).
Enable the `Cloud Build API` for your project (Search Term: `Cloud Build`).

The `Cloud Run` and `Cloud Build` sections can also be pinned from the hamburger menu on the left for easier access.

### 3. Setup `Google Cloud Build`

Go to the `trigger` tab on your project's loud Build` page.

Use your `Github` account to authenticate and connect your repository to the project.

Setup a `push trigger` to build your app and push to production on every commit.

### 4. Give `Google Cloud Build` relevant permissions.

Go to the `settings` tab in `Cloud Build`.

You'll see settings for `Service Account Permissions`.

Make sure that the `Cloud Run admin` permission is set to `ENABLED`.

### 5. Deploy

Commit your project and push to master.

You should see your project live in a couple of minutes with an autogenerated `https://run.app` URL.

You can find this URL by navigating to the `Cloud Run` section and clicking on the name of your container image.

### 6. Deploy again.

Commit a trivial change and push to master again.

Wait a couple of minutes, and you should see the updated changes live in your URL.

You can check the progress of the deployment (and any errors that might have occured) in the `Cloud Build` page in your project.

### Finishing Touches

The completed repository should look something like this:  
https://github.com/grobelDev/react-google-cloud-run

The end result URL should look something like this:  
https://react-google-cloud-run-zxc6fpw5uq-uc.a.run.app/

To clean up the project and not incur any expenses, just delete the `Project` from Google Cloud.

I hope you find this helpful.

---

## Probable Questions

- Cloud pricing can be confusing, what if a 'bad actor' or a misconfigured setting means that I get an expensive '\$XX,000' bill for me overnight?

You can limit the maximum number of allocated containers. The default is 1,000. Each container can handle 80 concurrent connections. If this is overkill for your needs, then set the cap to whatever fits your needs.

- Given that containers/compute units are dynamically spun up for meeting website demand (as opposed to a singular centralized server), wouldn't there be the same 'cold boot' problem found in serverless functions?

Well, yes. But surprisingly, I haven't seen significant delays in practice. I would suggest experimenting by repeatedly cold booting the website from this tutorial. Of course, my claims are not currently backed by anything empirical, so I'll update this answer as I get them.

- Can I change the default domain?

Yes. Here's a resource for that.  
https://cloud.google.com/run/docs/mapping-custom-domains

- Isn't this a bit complicated for a simple website?

From my experience, anything related to 'the Front-End/DevOps' has been surprisingly supremely complicated. Par for the course, really.

But, after getting everything set up, the developer experience should be mostly untarnished. Most of the added complexity comes from what happens _after_ a change is pushed to the master branch.

- Why not just host your website on a traditional server?

Personally, my main dealbreaker is cost.

You know what's better than hosting a website on a \$5/month DigitalOcean Ubuntu droplet?

Getting that website hosted for free.

Auto-scaling and precisely paying for compute resources is just icing on the cake.

- What's the difference between `Google Cloud Run` and `AWS Fargate`?

Unfortunately, I cannot speak definitively on this, because I have less experience with `AWS Fargate`. However, I do know that Fargate currently does not support scaling to zero, and requires a bit more setup before getting up and running.

- What about vendor lock-in? Aren't I creating a process that is dependent on the minutiae of Google Cloud?

Fortunately, containers are a format that are more platform agnostic.

Most of the platform specific 'trivia knowledge' revolves around the information in the `Setup Google Cloud` section. That information details the _how_ and _what_ we're going to be using the containerized `create-react-app` image for.

And this deployment process for container images is mostly an implementation detail.

In our case, we're running our container images on `Google Cloud Run`. But there's no reason they could not be run on `AWS Fargate` or a Kubernetes cluster.

- How is it so cheap? What's the catch?

The answer is containers, and the catch is also containers.

The main advantage to containers is that they make it easy to deterministically install dependencies. Seriously. This is the silver bullet so far as containers are concerned.

Why is this important?

As an example, think about how complicated it would be to recreate the development environment on your computer.

Imagine you were given a fresh new computer.

Your task: write a set of instructions for someone else so that they could run `create-react-app` on `localhost:3000` on a Github repository.

The instructions might look something like this:

1. Install `Google Chrome`.
2. (Optional) Install the `uBlock Origin` Chrome extension.
3. Download and Install the LTS `Node.js` version.
4. Download and Install `Visual Studio Code`.
5. Download and Install `Git`.
6. Create a git repository.
7. Run `npx create-react-app client`
8. Push the changes to the master branch.
9. `cd client`
10. `npm start`

If we were operating off of a version of a particular operating system (ex. macOS Mojave), then I would be relatively confident of replicating the same results every time.

This set of instructions is roughly equivalent to the set of `Dockerfile` instructions we used to build our container image.

Let's call the resulting machine state after installing all dependencies an 'image'. By going through the set of instructions, we are 'building' the image.

And after the image is 'built', it is then trivial to export and spin up multiple instances of this machine state. This is where my earlier metaphor breaks down, because easily exporting a particular machine state is not really possible on Windows/macOS.

And if we know we can easily spin up a particular machine state, then there's no reason to have a server running 24/7 waiting for a request. Just boot up one of those images from earlier.

And after it does the task we need it to do, just destroy it!

We can just spin up another instance as the need arises.

As multiple container images can run on a single machine, it's easy (on Google's end) to precisely allocate the amount of compute resources needed for your project. Which leads to significantly lowered costs.

The catch? Well, if we're constantly creating and destroying containers, then it's generally a bad idea to have an application dependent on persistent state.

For instance, it would generally be a bad idea to containerize a database. Container images are ephemeral in practice. Ephemeral databases are a **bad practice**.

If state is needed, then a container can just connect to a more traditionally hosted server/database.

Dynamically spinning up and destroying container images is what `Google Cloud Run` does for us.

Well, `Google Cloud Run` does more than just that. It also handles networking and load balancing, amongst other things. But for our purposes, I think that's a sufficent level of abstraction.

As a fun fact, the way `Google Cloud Build` works is by spinning up a container to build the project. Containers building containers. It's containers all the way down.

If you're more interested in understanding and configuring what's going on under the hood, I would suggest learning more about Kubernetes.

TL;DR  
Containers make it easy to recreate a particular machine state.  
That means we can create and destroy computer instances as we see fit without worrying about the installation process.  
Creating and destroying computer instances mean that they're generally NOT assumed to be reliant on persistent state.
