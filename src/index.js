import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom"
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './components/Product/Home'
import Blog from './components/Blog/Blog'
import Detail from './components/Blog/Detail'
import Register from './components/Account/Register'
import Update from './components/Account/Member/Update'
import Login from './components/Account/Login'
import Index from './components/Account/Index';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Product/Cart';
import Blog_hook from './components/Blog/Blog_hook';
import Detail_hook from './components/Blog/Detail_hook'
import { Provider } from 'react-redux';
import store from './components/store';
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App>
        <Switch>
          <Route exact path='/' component={Home} />
          {/* <Route path='/blog' component={Blog} /> */}
          {/* Blog use function Hook */}
          <Route path='/blog'><Blog_hook /></Route>

          {/* <Route path="/details/:id" component={Detail} /> */}
          <Route path="/details/:id" >
            <Detail_hook />
          </Route>
          <Route path='/member-register' component={Register} />
          <Route path='/product/detail/:id' component={ProductDetail} />
          <Route path='/login' component={Login} />
          <Route path='/cart' component={Cart} />
          <Route component={Index} />
        </Switch>
      </App>
    </Router>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
