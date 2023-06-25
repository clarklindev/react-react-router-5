## react router 5 + fetching firebase data

- this is a continuation from https://github.com/swagfinger/swagfinger-testing-react-router-5-and-forms.git
- firebase project: swagfinger-form-capture
- database: https://swagfinger-form-capture-default-rtdb.asia-southeast1.firebasedatabase.app/quotes.json

- we have now saved data to database and we want to present it as a list
- use useEffect to initially fetch data
- process returned data from firebase - firebase returns an object with key value and inside is the data we want

```js
//fetch data
useEffect(() => {
  setIsLoading(true);

  async function fetchData() {
    const response = await fetch(
      'https://swagfinger-form-capture-default-rtdb.asia-southeast1.firebasedatabase.app/quotes.json'
    );

    const data = await response.json;

    //process returned data from firebase - firebase returns an object with key value and inside is the data we want
    const savedEntries = [];

    for (const key in data) {
      const entry = {
        id: key,
        ...data[key],
      };

      savedEntries.push(entry);
    }

    setIsLoading(false);
    setFetchedData(savedEntries);
  }

  fetchData();
}, []);
```

- <!-- ------------------------------------------------------------------------------------------------ -->
  <!-- ------------------------------------------------------------------------------------------------ -->

## react router 5 + forms + firebase

- below is from 'NextJS & React - the complete guide by Maxmillian'

- <form onSubmit={onSubmitHandler}> with <button> for submit and
- <input> elements
- import {useRef} from 'react'
- create refs for every input
- add ref to input
- access refs value via .current.value
- prepare collected values for sending as an object
- pass (a prop) into the form page a function to handle where to send the data eg. onAdd(collectedData)
- Shop page will handle the sending

```js
//create a ref
const nameInputRef = useRef();

//then add ref to input
<input type='text' required id='name' ref={nameInputRef} />;

//access refs value via .current.value
const enteredName = nameInputRef.current.value;

//prepare collected values for sending
const collectedData = {
  name: enteredName,
  email: enteredEmail,
};
```

## firebase

- create a firebase project
- use realtime database
- security rules - test mode -> results in an url (api)
- something like this: https://swagfinger-form-capture-default-rtdb.asia-southeast1.firebasedatabase.app
- and we add a database but trailing the above url with the name of the database
  eg. https://swagfinger-form-capture-default-rtdb.asia-southeast1.firebasedatabase.app/quotes.json
- NOTE: THERE IS A .JSON AT THE END - WHEN WE ARE CREATING A DATABASE
- define a POST method as a second parameter to fetch:
  {
  method: 'POST',
  }
- and attach data we want to send with request (in JSON format)
- we can use JSON.stringify(//pass any js object to create json)

## back to sending the request

- lesson 43 - Sending a POST Http Request

- using 'fetch'
- once sent, in firebase an entry is created - it has autogenerated ID

```js
//Shop.js
const onAddQuoteHandler = (collectedData) => {
  fetch(
    'https://swagfinger-form-capture-default-rtdb.asia-southeast1.firebasedatabase.app/quotes.json',
    {
      method: 'POST',
      body: JSON.stringify(collectedData),
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
};

<QuoteForm onAdd={onAddQuoteHandler} />;
```

## navigating away

- use useHistory hook from 'reeact-router-dom' which exposes some methods to us.
- fetch returns a promise, so we can handle that with .then()
- history has method: history.push() which will navigate away but then you can use browser back button...
- and history.replace() which redirects without allowing to go back.

```js
import { useHistory } from 'react-router-dom';

const history = useHistory();
fetch(/*our code*/).then(() => {
  history.replace('/');
});
```

- <!-- ------------------------------------------------------------------------------------------------ -->
  <!-- ------------------------------------------------------------------------------------------------ -->

## routing router v5

### install

```shell
npm install --save react-router-dom@5
```

### index.js

- import { BrowserRouter } from 'react-router-dom';
- wrap <App> with <BrowserRouter><App/></BrowserRouter>

### App.js

- Define routes with Route component
- import {Route } from 'react-router-dom'
- Route has defined paths - and which component to load - path is from url (\*part after domain)

### selective route rendering

- import {Switch} from 'react-router-dom' which wraps every route, and it say only go to one route at a time
- note: route / is always rendered
- unless you specify exact={true} or just exact property on the / route
- use <Switch> to wrap all your <Route>s

## navigation & links

- import { Link } from 'react-router-dom';
- use Link elements instead of <a>
- use "to" to navigate <Link to=""> eg. <Link to='/'>intro</Link>

```jsx
// Navigation.js
//navigation should look something like this:
import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navigation.module.css';

export const Navigation = () => {
  return (
    <header className={classes.header}>
      <div className={classes.logo}>logo</div>
      <nav>
        <ul>
          <li>
            <Link to='/'>intro</Link>
          </li>
          <li>
            <Link to='/shop'>shop</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
```

- import Navigation.js into App (where the routes are) and wrap the <Navigation> component around the <Switch> routes
- Navigation always showing because it wraps <Switch>

## refactor

- App.js - import Layout and wrap <Layout><Switch></Switch></Layout>
- refactor Navigation into layout/Layout
- <main>{props.children}</main> tag in Layout

```js
//Layout.js
import classes from './Layout';
import { Navigation } from './Navigation';

export const Layout = ({ children }) => {
  return (
    <div>
      <Navigation />
      <main>{children}</main>
    </div>
  );
};
```

```js
//App.js
import { Route, Switch } from 'react-router-dom'; //react router v5
import { About, Shop, Intro } from './pages';
import { Layout } from './layout';

function App() {
  return (
    <div className='App'>
      <Layout>
        <Switch>
          <Route path='/' exact>
            <Intro />
          </Route>
          <Route path='/shop'>
            <Shop />
          </Route>
          <Route path='/about'>
            <About />
          </Route>
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
```