
import React, { Component } from 'react'
// import './App.css';
import Footer from './components/Layout/Footer'
import Header from './components/Layout/Header'
import MenuLeft from './components/Layout/MenuLeft'
import { withRouter } from 'react-router-dom';
import { AppContext } from './components/Product/AppContext'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartItems: 1
    }
    this.stateLoginContext = this.stateLoginContext.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }

  stateLoginContext(flag) {
    console.log(flag)
    localStorage["checkLogin"] = JSON.stringify(flag);
  }

  addToCart(a) {
    localStorage["objCart"] = JSON.stringify(a);
    const objCart = JSON.parse(localStorage.getItem("objCart"))
    const qty = Object.keys(objCart).length
    this.setState({
      cartItems: qty
    })

  }
  render() {

    let pathname = this.props.location.pathname

    return (

      <AppContext.Provider value={{
        loginContext: this.stateLoginContext,
        cartItems: this.state.cartItems,
        addToCart: this.addToCart
      }}>
        <Header />
        <section>
          <div className="container">
            <div className="row">
              {(pathname.includes("account") || pathname.includes("cart")) ? '' : <MenuLeft />}
              {this.props.children}
            </div>
          </div>
        </section>
        <Footer />
      </AppContext.Provider>


    );
  }
}


export default withRouter(App)
// (mapStateToProps, actions)(withRouter(Application));
