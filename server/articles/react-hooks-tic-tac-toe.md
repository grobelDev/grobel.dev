---
title: Build Tic Tac Toe with React Hooks, useState, and useEffect - Introductory Tutorial
description: Learn how to create Tic Tac Toe in React by utilizing React hooks like useState and useEffect in this step-by-step guide.
slug: react-hooks-tic-tac-toe
---

Learn how to create Tic Tac Toe in React by utilizing React hooks like useState and useEffect in this step-by-step guide.

By the end of this guide, we will have implemented tic-tac-toe in React by utilizing `useState` and `useEffect`.

This guide is meant to emulate the tutorial from the React docs:  
https://reactjs.org/tutorial/tutorial.html

The end result is here:
https://react-hooks-tic-tac-toe-zxc6fpw5uq-uc.a.run.app/

The repository is here:
https://github.com/grobelDev/tic-tac-toe-hooks

## Step 1: create-react-app

Let's begin from the `create-react-app` template.

Create your project directory. For me, I tend to name my projects `client`.

```
mkdir client
```

Then, `cd` into it and run the `create-react-app` command:

```
cd client && npx create-react-app ./
```

Test the installation by running `npm start` from the terminal.

You should see an output that looks like this:  
https://react-google-cloud-run-zxc6fpw5uq-uc.a.run.app/

## Step 2: Clean some boilerplate

From here on, it will be assumed that our terminal is currently inside the `./client` directory.

Most of our code is going to be located in `./src/App.js`, so let's take a look at it.

### `./src/App.js`

```js
import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <img src={logo} className='App-logo' alt='logo' />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className='App-link'
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

Current Snapshot:  
![](https://cdn.discordapp.com/attachments/636565266356240394/693816880464527420/screenshot.png)

We won't be needing the logo or anything inside the `<header>` div, so let's get rid of it.

#### `./src/App.js`

```js
import React from 'react';
import './App.css';

function App() {
  return (
    <div className='App'>
      <header className='App-header'></header>
    </div>
  );
}

export default App;
```

Current Snapshot:
![](https://cdn.discordapp.com/attachments/636565266356240394/693817438935974058/screenshot.png)

### Step 3: Rendering some squares

Tic-Tac-Toe is a game where players fill in some squares in a 3x3 grid.

Before we worry about tracking the game state, we need some squares.

So let's create that.

```js
import React from 'react';
import './App.css';

function App() {
  function Square() {
    return <button></button>;
  }

  return (
    <div className='App'>
      <header className='App-header'></header>
    </div>
  );
}

export default App;
```

As the game requires clicking on the squares, I've gone ahead and made them `<buttons>` instead of as vanilla `<div>`'s.

I want to be able to render text inside the squares, so let's pass in a value to our `<Square>`.

```js
import React from 'react';
import './App.css';

function App() {
  function Square({ index }) {
    return <button>{index}</button>;
  }

  return (
    <div className='App'>
      <header className='App-header'></header>
    </div>
  );
}

export default App;
```

Now, let's try rendering the `<Square>` component.

```js
import React from 'react';
import './App.css';

function App() {
  function Square({ index }) {
    return <button>{index}</button>;
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Square index={0}></Square>
      </header>
    </div>
  );
}

export default App;
```

Current Snapshot:  
![](https://cdn.discordapp.com/attachments/636565266356240394/693817699448389642/screenshot.png)

That's one `<Square>`. We'll need 9 in total, so let's spawn in the rest.

```js
import React from 'react';
import './App.css';

function App() {
  function Square({ index }) {
    return <button>{index}</button>;
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Square index={0}></Square>
        <Square index={1}></Square>
        <Square index={2}></Square>
        <Square index={3}></Square>
        <Square index={4}></Square>
        <Square index={5}></Square>
        <Square index={6}></Square>
        <Square index={7}></Square>
        <Square index={8}></Square>
      </header>
    </div>
  );
}

export default App;
```

Current Snapshot:  
![](https://cdn.discordapp.com/attachments/636565266356240394/693815584974045194/screenshot.png)

let's make the squares look a little nicer.

Go to the `App.css` file and add this snippet of CSS.

#### `App.css`

```css
/* Add this to the bottom */
.square {
  height: 3rem;
  width: 3rem;
  background-color: #fff;
  font-size: 1.125rem;
  float: left;
}
```

Now let's apply this CSS class to our `<Square>` component.

#### `App.js`

```js
import React from 'react';
import './App.css';

function App() {
  function Square({ index }) {
    return <button className='square'>{index}</button>;
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <Square index={0}></Square>
        <Square index={1}></Square>
        <Square index={2}></Square>
        <Square index={3}></Square>
        <Square index={4}></Square>
        <Square index={5}></Square>
        <Square index={6}></Square>
        <Square index={7}></Square>
        <Square index={8}></Square>
      </header>
    </div>
  );
}

export default App;
```

Snapshot:  
![](https://cdn.discordapp.com/attachments/636565266356240394/693816330956308541/screenshot.png)

We want a 3x3 grid, so let's split up the `<Square>` divs to reflect that.

```js
import React from 'react';
import './App.css';

function App() {
  function Square({ index }) {
    return <button className='square'>{index}</button>;
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
      </header>
    </div>
  );
}

export default App;
```

Snapshot:
![](https://cdn.discordapp.com/attachments/636565266356240394/693818516662517841/screenshot.png)

Now it's starting to look more like our real application.

But, `<Square>`'s are not everything. We need to program in the game now, which means we have to think about State.

### Step 4: Tracking State

First, we need something that will track the State of all of our individual `<Square>`'s.

The Game needs this information to determine who won the game.

So let's start by using an `Array` to represent the Game's State.

```js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));

  function Square({ index }) {
    return <button className='square'>{index}</button>;
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
      </header>
    </div>
  );
}

export default App;
```

Two lines were changed.

First, note that `useState` is now imported from the first line.

Secondly, let's look at this line here.

```js
const [gameState, setGameState] = useState(Array(9).fill(null));
```

When defining state with `useState`, we input two parameters.

The first one (`gameState` in this instance) is the name we set to READ or ACCESS our state.

Calling `gameState` never changes its value.

If we do want to change `gameState`'s value, we use the second argument (`setGameState` in this instance).

`setGameState` is the name we set to WRITE or CHANGE our state.

As for the `useState(Array(9).fill(null))` - `useState()` takes in a parameter to INITIALIZE this particular variable's State.

That is, we have initialized the value of `gameState` to be an empty `Array` of length 9 that is filled with `null` values.

### Step 5: Connecting State to `<Square>`

Now, let's connect our newly created State to our `<Square>` components.

First, let's add a new `prop` to `<Square>` called `value`.

`Value` will be responsible for the text that is shown in our `<Square>`.

```js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));

  function Square({ index }) {
    let value = '';
    return <button className='square'>{value}</button>;
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
      </header>
    </div>
  );
}

export default App;
```

Then, let's connect `value` to our `gameState`.

The method of doing this is simple, all we have to do is set the `value` of `<Square>` to be equal to `gameState[i]` as we conveniently used `index` to tag our `<Square>`'s earlier.

```js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));

  function Square({ index }) {
    let value = gameState[index];
    return <button className='square'>{value}</button>;
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
      </header>
    </div>
  );
}

export default App;
```

Snapshot:  
![](https://cdn.discordapp.com/attachments/636565266356240394/693825365184872483/screenshot.png)

let's cause our State to change every time we click a `<Square>`.

We do this by adding an `onClick` function `prop` to our `<Square>` function.

```js
import React, { useState } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));

  function Square({ index }) {
    let value = gameState[index];
    return (
      <button
        className='square'
        onClick={() => {
          let gameStateCopy = gameState.slice();
          gameStateCopy[index] = 'X';
          setGameState(gameStateCopy);
        }}
      >
        {value}
      </button>
    );
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
      </header>
    </div>
  );
}

export default App;
```

Try clicking on the buttons. They should now create X's! Progress.

Snapshot (showing some example clicks, yours might look different):
![](https://cdn.discordapp.com/attachments/636565266356240394/693827499116986428/screenshot.png)

let's take a look at the `onClick`.

```js
<button
  className='square'
  onClick={() => {
    let gameStateCopy = gameState.slice();
    gameStateCopy[index] = 'X';
    setGameState(gameStateCopy);
  }}
>
  {value}
</button>
```

We did something that at first glance looks odd. We COPIED `gameState` and used the copy to update our State.

This is because of a very important restriction on the first variable from `useState`.

Remember that `gameState` CANNOT change.

`gameState` is a READ-ONLY value. What that means is that we CANNOT CHANGE or REASSIGN values in `gameState`.

It is IMMUTABLE.

As a point of comparison, here is some INVALID code.

```js
// THIS WILL NOT WORK
<button
  className='square'
  onClick={() => {
    gameState[index] = 'X';
    setGameState(gameState);
  }}
>
  {value}
</button>
```

To get around this, we created a copy of the current State with `gameStateCopy`.

Then, we were free to reassign values in `gameStateCopy` as needed to overwrite our old result.

### Step 6: Using `useEffect` to track changes in State

So now we are updating our State by clicking on our `<Square>`'s.

But it would be nice if we had some way of verifying that.

Like, something that would reliably `console.log(gameState)` every time we changed the value of `gameState`.

Enter `useEffect`.

```js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  function Square({ index }) {
    let value = gameState[index];
    return (
      <button
        className='square'
        onClick={() => {
          let gameStateCopy = gameState.slice();
          gameStateCopy[index] = 'X';
          setGameState(gameStateCopy);
        }}
      >
        {value}
      </button>
    );
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
      </header>
    </div>
  );
}

export default App;
```

Now, clicking the `<Square>`'s should have the same behavior.

However, the `Console` should now also be printing the updated value of `gameState` every time a button is clicked!

Snapshot:
![](https://cdn.discordapp.com/attachments/636565266356240394/693832704315359292/unknown.png)

So you might be asking,

"Why not just put the `console.log(gameState)` right after calling `setGameState(gameStateCopy)`?"

"Why even bother using `useEffect()` here?"

Well, doing that will actually lead to inconsistent behavior.

Consider this INVALID version of the code:

```js
// INVALID
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));

  // useEffect(() => {
  //   console.log(gameState);
  // }, [gameState]);

  function Square({ index }) {
    let value = gameState[index];
    return (
      <button
        className='square'
        onClick={() => {
          let gameStateCopy = gameState.slice();
          gameStateCopy[index] = 'X';
          setGameState(gameStateCopy);
          console.log(gameState);
        }}
      >
        {value}
      </button>
    );
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
      </header>
    </div>
  );
}

export default App;
```

If we now experiment and look at the Console, clicking on the `<Square>`'s still shows the updated values of `gameState`.

But with one important caveat. The updates are offset by one. Odd.

Look at this snapshot:
![](https://cdn.discordapp.com/attachments/636565266356240394/693834340085530664/unknown.png)

The value of the `console.log(gameState)` should be:

```
(9) ['X', null, null, null, null, null, null, null, null]
```

But it just displays as the original `Array` of `null` values instad.

So to guarantee reliability, use `useEffect` instead.

Moving on...

### Step 7: Adding Two Players

let's add a second character to the game.

We're just going to be alternating between two different characters, so we can represent that state with a simple `boolean` called `xIsNext`.

```js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  function Square({ index }) {
    let value = gameState[index];
    return (
      <button
        className='square'
        onClick={() => {
          let gameStateCopy = gameState.slice();
          gameStateCopy[index] = 'X';
          setGameState(gameStateCopy);
        }}
      >
        {value}
      </button>
    );
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
      </header>
    </div>
  );
}

export default App;
```

We set `xIsNext`'s initial value to `true` as we're going to make `X` go first.

So let's now change the `<Square>` code to use our newly created State.

```js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  function Square({ index }) {
    let value = gameState[index];
    return (
      <button
        className='square'
        onClick={() => {
          let gameStateCopy = gameState.slice();
          if (xIsNext) {
            gameStateCopy[index] = 'X';
          } else {
            gameStateCopy[index] = 'O';
          }
          setXIsNext(!xIsNext);
          setGameState(gameStateCopy);
        }}
      >
        {value}
      </button>
    );
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
      </header>
    </div>
  );
}

export default App;
```

Let's also make it so that we only add values if the space is `null` (has not been selected yet).

```js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    console.log(gameState);
  }, [gameState]);

  function Square({ index }) {
    let value = gameState[index];
    return (
      <button
        className='square'
        onClick={() => {
          let gameStateCopy = gameState.slice();
          if (!value) {
            if (xIsNext) {
              gameStateCopy[index] = 'X';
            } else {
              gameStateCopy[index] = 'O';
            }
            setXIsNext(!xIsNext);
            setGameState(gameStateCopy);
          }
        }}
      >
        {value}
      </button>
    );
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
      </header>
    </div>
  );
}

export default App;
```

Great! Looks like our state is being recorded properly.

Snapshot:
![](https://cdn.discordapp.com/attachments/636565266356240394/693837096602959982/unknown.png)

## Step 8: Determining Who Won the Game

Let's now create a function to determine if the a Player has won the game.

This is a mostly straightforward process.

The function will look something like this:

```js
function calculateWinner(gameState) {
  const possibleLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  // go over all possibly winning lines and check if they consist of only X's/only O's
  for (let i = 0; i < possibleLines.length; i++) {
    const [a, b, c] = possibleLines[i];
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[a] === gameState[c]
    ) {
      return gameState[a];
    }
  }
  return null;
}
```

Essentially, the function takes in our `gameState` value as its parameter.

If there is a winner, it will return 'X' or 'O, depending on who won.

Else, it will return a falsey `null` value if there is no current victor.

We will run this function in `useEffect`, as we want to check if there is a victor every time our State changes.

Let's now incorporate the function:

```js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    console.log(gameState);
    let victor = calculateWinner(gameState);
    if (victor) {
      console.log(`${victor} has won!`);
    }
  }, [gameState]);

  function calculateWinner(gameState) {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // go over all possibly winning lines and check if they consist of only X's/only O's
    for (let i = 0; i < possibleLines.length; i++) {
      const [a, b, c] = possibleLines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  }

  function Square({ index }) {
    let value = gameState[index];
    return (
      <button
        className='square'
        onClick={() => {
          let gameStateCopy = gameState.slice();
          if (!value) {
            if (xIsNext) {
              gameStateCopy[index] = 'X';
            } else {
              gameStateCopy[index] = 'O';
            }
            setXIsNext(!xIsNext);
            setGameState(gameStateCopy);
          }
        }}
      >
        {value}
      </button>
    );
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
      </header>
    </div>
  );
}

export default App;
```

If there is a victor, it should now output the result as in the Console.

Snapshot:
![](https://cdn.discordapp.com/attachments/636565266356240394/693839442980372530/unknown.png)

It's a bit boring to have it only show in the Console, so let's cause it to appear on our App instead.

We're going to do this by creating a new State variable called `gameResult`.

```js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameResult, setGameResult] = useState();

  useEffect(() => {
    console.log(gameState);
    let victor = calculateWinner(gameState);
    if (victor) {
      setGameResult(`${victor} has won!`);
      console.log(`${victor} has won!`);
    }
  }, [gameState]);

  function calculateWinner(gameState) {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // go over all possibly winning lines and check if they consist of only X's/only O's
    for (let i = 0; i < possibleLines.length; i++) {
      const [a, b, c] = possibleLines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  }

  function Square({ index }) {
    let value = gameState[index];
    return (
      <button
        className='square'
        onClick={() => {
          let gameStateCopy = gameState.slice();
          if (!value) {
            if (xIsNext) {
              gameStateCopy[index] = 'X';
            } else {
              gameStateCopy[index] = 'O';
            }
            setXIsNext(!xIsNext);
            setGameState(gameStateCopy);
          }
        }}
      >
        {value}
      </button>
    );
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
        <div>{gameResult}</div>
      </header>
    </div>
  );
}

export default App;
```

Snapshot:
![](https://cdn.discordapp.com/attachments/636565266356240394/693840710499172423/unknown.png)

And lastly, let's also make sure to check for the DRAW case, if neither player wins.

```js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameResult, setGameResult] = useState();

  useEffect(() => {
    console.log(gameState);

    // Returns TRUE if there are no more NULL elements in gameState
    let isDraw = !gameState.some(element => {
      return element === null;
    });

    let victor = calculateWinner(gameState);
    if (victor) {
      setGameResult(`${victor} has won!`);
      console.log(`${victor} has won!`);
    } else if (isDraw) {
      setGameResult('Game is a draw!');
      console.log('Game is a draw!');
    }
  }, [gameState]);

  function calculateWinner(gameState) {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // go over all possibly winning lines and check if they consist of only X's/only O's
    for (let i = 0; i < possibleLines.length; i++) {
      const [a, b, c] = possibleLines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  }

  function Square({ index }) {
    let value = gameState[index];
    return (
      <button
        className='square'
        onClick={() => {
          let gameStateCopy = gameState.slice();
          if (!gameResult) {
            if (!value) {
              if (xIsNext) {
                gameStateCopy[index] = 'X';
              } else {
                gameStateCopy[index] = 'O';
              }
              setXIsNext(!xIsNext);
              setGameState(gameStateCopy);
            }
          }
        }}
      >
        {value}
      </button>
    );
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
        <div>{gameResult}</div>
      </header>
    </div>
  );
}

export default App;
```

Let's also make it so that the State stops changing after if a winner is determined.

```js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameResult, setGameResult] = useState();

  useEffect(() => {
    console.log(gameState);

    // Returns TRUE if there are no more NULL elements in gameState
    let isDraw = !gameState.some(element => {
      return element === null;
    });

    let victor = calculateWinner(gameState);
    if (victor) {
      setGameResult(`${victor} has won!`);
      console.log(`${victor} has won!`);
    } else if (isDraw) {
      setGameResult('Game is a draw!');
      console.log('Game is a draw!');
    }
  }, [gameState]);

  function calculateWinner(gameState) {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // go over all possibly winning lines and check if they consist of only X's/only O's
    for (let i = 0; i < possibleLines.length; i++) {
      const [a, b, c] = possibleLines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  }

  function Square({ index }) {
    let value = gameState[index];
    return (
      <button
        className='square'
        onClick={() => {
          let gameStateCopy = gameState.slice();
          if (!gameResult) {
            if (!value) {
              if (xIsNext) {
                gameStateCopy[index] = 'X';
              } else {
                gameStateCopy[index] = 'O';
              }
              setXIsNext(!xIsNext);
              setGameState(gameStateCopy);
            }
          }
        }}
      >
        {value}
      </button>
    );
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
        <div>{gameResult}</div>
      </header>
    </div>
  );
}

export default App;
```

![](https://cdn.discordapp.com/attachments/636565266356240394/693842496584810516/unknown.png)

## Step 9: Adding a Reset Button

Lastly, let's add a RESET button to start a new game.

First, let's create a new `<ResetButton>` functionaly component to handle that.

```js
function ResetButton() {
  return (
    <button
      onClick={() => {
        let initialState = Array(9).fill(null);
        setGameState(initialState);
        setGameResult();
      }}
    >
      Reset Button
    </button>
  );
}
```

Let's now add it to our App.

```js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [gameState, setGameState] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [gameResult, setGameResult] = useState();

  useEffect(() => {
    console.log(gameState);

    // Returns TRUE if there are no more NULL elements in gameState
    let isDraw = !gameState.some(element => {
      return element === null;
    });

    let victor = calculateWinner(gameState);
    if (victor) {
      setGameResult(`${victor} has won!`);
      console.log(`${victor} has won!`);
    } else if (isDraw) {
      setGameResult('Game is a draw!');
      console.log('Game is a draw!');
    }
  }, [gameState]);

  function calculateWinner(gameState) {
    const possibleLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    // go over all possibly winning lines and check if they consist of only X's/only O's
    for (let i = 0; i < possibleLines.length; i++) {
      const [a, b, c] = possibleLines[i];
      if (
        gameState[a] &&
        gameState[a] === gameState[b] &&
        gameState[a] === gameState[c]
      ) {
        return gameState[a];
      }
    }
    return null;
  }

  function Square({ index }) {
    let value = gameState[index];
    return (
      <button
        className='square'
        onClick={() => {
          let gameStateCopy = gameState.slice();
          if (!gameResult) {
            if (!value) {
              if (xIsNext) {
                gameStateCopy[index] = 'X';
              } else {
                gameStateCopy[index] = 'O';
              }
              setXIsNext(!xIsNext);
              setGameState(gameStateCopy);
            }
          }
        }}
      >
        {value}
      </button>
    );
  }

  function ResetButton() {
    return (
      <button
        onClick={() => {
          let initialState = Array(9).fill(null);
          setGameState(initialState);
          setGameResult();
        }}
      >
        Reset Button
      </button>
    );
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <div>
          <Square index={0}></Square>
          <Square index={1}></Square>
          <Square index={2}></Square>
        </div>
        <div>
          <Square index={3}></Square>
          <Square index={4}></Square>
          <Square index={5}></Square>
        </div>
        <div>
          <Square index={6}></Square>
          <Square index={7}></Square>
          <Square index={8}></Square>
        </div>
        <div>
          <ResetButton></ResetButton>
        </div>
        <div>{gameResult}</div>
      </header>
    </div>
  );
}

export default App;
```

And that, as they say, is that.

Thanks for reading. I hope you found this helpful.

Try out the final result here:  
https://react-hooks-tic-tac-toe-zxc6fpw5uq-uc.a.run.app/

Here is the respository:  
https://github.com/grobelDev/tic-tac-toe-hooks

Final Snapshot:
![](https://cdn.discordapp.com/attachments/636565266356240394/693844936574894140/unknown.png)

![](https://cdn.discordapp.com/attachments/636565266356240394/693858495656755231/screenshot.png)
