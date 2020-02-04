## Section 1: Front-End (React + Tailwind):

### Step 1: Setup the initial repository.

Let's start by creating a directory to hold the project.

```
mkdir cra-tailwind-purgecss && cd $_
```

### Step 2: Install the necessary packages.

```
npx create-react-app ./ &&
npm install tailwindcss postcss-cli autoprefixer --save-dev &&
npx tailwind init &&
npm install -D @fullhuman/postcss-purgecss &&
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
