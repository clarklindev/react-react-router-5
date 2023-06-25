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
            <Link to='/about'>about</Link>
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
