import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Link } from "@reach/router";
import Header from './components/Layout/Head'
// import { Beforeunload } from 'react-beforeunload';

import Slider from './components/Layout/Slider'
import MenuLeft from './components/Layout/MenuLeft'
import Footer from './components/Layout/Footer'


import { AppContext } from './components/AppContext'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            countWishlist: 0
        }
        this.stateLoginContext = this.stateLoginContext.bind(this)
        this.stateWishlistContext = this.stateWishlistContext.bind(this)
    }

    // check login
    stateLoginContext(flag) {
        localStorage["isLoggedIn"] = JSON.stringify(flag);
    }
    stateWishlistContext(number) {

        this.setState({
            countWishlist: number
        })
    }
    // growAYearOlder = () => (
    //   this.setState({
    //     age: this.state.age + 1
    //   })
    // )

    render() {
        // localStorage.clear();
        // localStorage.removeItem('qty');  
        let pathname = this.props.location.pathname
        return (
            // <Beforeunload onBeforeunload={this.onBeforeunload}>
            // <AppContext.Provider value={{st: () => console.log('re')}}>
            <AppContext.Provider value={{
                state: this.state,
                qtyCartContext: this.stateQtyCartContext,
                loginContext: this.stateLoginContext,
                wishlistContext: this.stateWishlistContext
            }}>
                <>
                    <Header />
                    {pathname === '/' ? <Slider /> : ''}
                    <section>
                        <div className="container">
                            <div className="row">
                                {(pathname.includes("account") || pathname.includes("cart")) ? '' : <MenuLeft />}
                                {this.props.children}
                            </div>
                        </div>
                    </section>
                    <Footer />
                </>
            </AppContext.Provider>
            // {/* // </Beforeunload> */}
        )
    }
}
export default withRouter(App)
