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
