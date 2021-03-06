import React from 'react';
import ReactDOM from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route
    // Link,
    // useRouteMatch
} from "react-router-dom";

import './index.css';
import App from './App';
import Home from './components/Home';
import Login from './components/Member/Login';
import Account from './components/Account/Index';
// import AccountProduct from './components/Account/Product/List';
import DetailProduct from './components/Product/Detail';
import Cart from './components/Cart/Cart';
import Blog from './components/Blog/Index';
import DetailBlog from './components/Blog/Detail';
import NotFound from './components/NotFound';
import Wishlist from './components/Account/Product/Wishlist'
import Search from './components/Product/Search'
import Test from './components/Test'
import Demo from './Demo';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <div>
        <Router>
            <App>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/login' component={Login} />
                    <Route path='/test' component={Test} />
                    {/* <Route path='/account/product/li' component={AccountProduct} /> */}
                    <Route path='/product/detail/:id' component={DetailProduct} />
                    <Route path='/cart' component={Cart} />
                    <Route path='/blog/list' component={Blog} />
                    <Route path='/blog/detail/:id' component={DetailBlog} />
                    <Route path='/wishlist' component={Wishlist} />
                    <Route path='/demo' component={Demo} />
                    <Route path='/product/search' component={Search} />
                    <Route component={Account} />
                    {/* <Route component={NotFound} /> */}
                </Switch>
            </App>
        </Router>
    </div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();







