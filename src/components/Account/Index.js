import React, { Component } from 'react'
import {
    Switch,
    Route
} from "react-router-dom";
import App from './App'
import Update from './Member/Update'
import List from './My-product/List'
import Add from './My-product/Add'
import Edit from './My-product/Edit'
class Index extends Component {
    render() {
        return (
            <App>
                <Switch>
                    <Route exact path='/account' component={Update} />
                    <Route path='/account/product/list' component={List} />
                    {/*  */}
                    <Route path='/account/product/add' component={Add} />
                    <Route path='/account/product/edit/:id' component={Edit} />
                </Switch>
            </App>
        );
    }
}
export default Index