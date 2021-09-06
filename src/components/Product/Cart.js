import React, { Component } from 'react'
import axios from "axios"
import { AppContext } from './AppContext';

class Cart extends Component {
    static contextType = AppContext
    constructor(props) {
        super(props);
        this.state = {
            listCart: [],
        }
    }
    componentDidMount() {
        const objCart = JSON.parse(localStorage.getItem("objCart"))

        axios.post('http://localhost/laravel/public/api/product/cart', objCart)
            .then(res => {
                if (res.data.data) {
                    let tam = [];
                    tam = res.data.data;
                    Object.keys(tam).map((item, i) => {
                        tam[item].image = JSON.parse(tam[item].image);
                    });
                    this.setState({
                        listCart: tam,

                    })

                }
            })
    }
    deleteQty(item) {
        const objCart = JSON.parse(localStorage.getItem("objCart"))
        delete objCart[item.id]
        const id = item.id
        const listCart = this.state.listCart.filter((item) => item.id !== id)

        this.setState({
            listCart: listCart
        })
        // localStorage.setItem("objCart", JSON.stringify(objCart))
        this.context.addToCart(objCart)
    }
    qtyDown(item, index) {
        const objCart = JSON.parse(localStorage.getItem("objCart"))
        const cartItems = this.state.listCart;
        if (item.qty > 1) {
            cartItems[index].qty = item.qty - 1
            this.setState({
                listCart: cartItems
            })
            objCart[item.id] = item.qty

        }
        else {
            delete objCart[item.id]
            const id = item.id
            const listCart = this.state.listCart.filter((item) => item.id !== id);
            this.setState({
                listCart: listCart
            })
        }
        // localStorage.setItem("objCart", JSON.stringify(objCart))
        this.context.addToCart(objCart)
    }
    qtyUp(item, index) {

        // console.log(this.state.listCart)
        const objCart = JSON.parse(localStorage.getItem("objCart"))
        const cartItems = this.state.listCart;
        cartItems[index].qty = item.qty + 1;
        this.setState({
            listCart: cartItems

        })

        objCart[item.id] = item.qty;
        localStorage.setItem("objCart", JSON.stringify(objCart))

    }
    showCart() {
        let listCart = this.state.listCart
        // console.log(this.state.listCart)
        return listCart.map((item, index) => {

            return (

                <tr>
                    <td className="cart_product">
                        <a><img height="100px" width="100px" src={`http://localhost/laravel/public/upload/user/product/` + item.id_user + "/" + item.image[0]} alt="" />
                        </a>
                    </td>
                    <td className="cart_description">
                        <h4>{item.name}</h4>
                        <p className="id_h">ID: {item.id}</p>
                    </td><td className="cart_price">
                        <p> {item.price} $</p>
                    </td>
                    <td className="cart_quantity">
                        <div className="cart_quantity_button">
                            <a className="cart_quantity_down" onClick={() => this.qtyDown(item, index)}> - </a>
                            <input className="cart_quantity_input" type="text" name="quantity" value={item.qty} autoComplete="off" size={2} />
                            <a className="cart_quantity_up" onClick={() => this.qtyUp(item, index)} > + </a>
                        </div>
                    </td>
                    <td className="cart_total">
                        <p className="cart_total_price">{item.qty * item.price} $</p>
                    </td>
                    <td className="cart_delete">
                        <a className="cart_quantity_delete" onClick={() => this.deleteQty(item)}><i className="fa fa-times" /></a>
                    </td>
                </tr>
            )
        })

    }

    totalCart() {
        const listCart = this.state.listCart
        let totalPrice = 0;
        listCart.map((item) => {
            totalPrice = totalPrice + item.price * item.qty;
        });
        return (
            < div id="do_action" >
                <div className="container">
                    <div className="heading">
                        <h3>What would you like to do next?</h3>
                        <p>
                            Choose if you have a discount code or reward points you want to use or
                            would like to estimate your delivery cost.
                        </p>
                    </div>
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="chose_area">
                                <ul className="user_option">
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Coupon Code</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Use Gift Voucher</label>
                                    </li>
                                    <li>
                                        <input type="checkbox" />
                                        <label>Estimate Shipping &amp; Taxes</label>
                                    </li>
                                </ul>
                                <ul className="user_info">
                                    <li className="single_field">
                                        <label>Country:</label>
                                        <select>
                                            <option>United States</option>
                                            <option>Bangladesh</option>
                                            <option>UK</option>
                                            <option>India</option>
                                            <option>Pakistan</option>
                                            <option>Ucrane</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field">
                                        <label>Region / State:</label>
                                        <select>
                                            <option>Select</option>
                                            <option>Dhaka</option>
                                            <option>London</option>
                                            <option>Dillih</option>
                                            <option>Lahore</option>
                                            <option>Alaska</option>
                                            <option>Canada</option>
                                            <option>Dubai</option>
                                        </select>
                                    </li>
                                    <li className="single_field zip-field">
                                        <label>Zip Code:</label>
                                        <input type="text" />
                                    </li>
                                </ul>
                                <a className="btn btn-default update" href>
                                    Get Quotes
                                </a>
                                <a className="btn btn-default check_out" href>
                                    Continue
                                </a>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className="total_area">
                                <ul>
                                    <li>
                                        Cart Sub Total <span className="total-sum" >{totalPrice} $</span>
                                    </li>
                                    <li>
                                        Eco Tax <span>$2</span>
                                    </li>
                                    <li>
                                        Shipping Cost <span>Free</span>
                                    </li>
                                    <li>
                                        Total <span>$61</span>
                                    </li>
                                </ul>
                                <a className="btn btn-default update" href>
                                    Update
                                </a>
                                <a className="btn btn-default check_out" href>
                                    Check Out
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
    render() {

        return (

            <div id="cart_items">
                <div className="container">
                    <div className="breadcrumbs">
                        <ol className="breadcrumb">
                            <li><a href="#">Home</a></li>
                            <li className="active">Shopping Cart</li>
                        </ol>
                    </div>
                    <div className="table-responsive cart_info">
                        <table className="table table-condensed">
                            <thead>
                                <tr className="cart_menu">
                                    <td className="image">Item</td>
                                    <td className="description" />
                                    <td className="price">Price</td>
                                    <td className="quantity">Quantity</td>
                                    <td className="total">Total</td>
                                    <td />
                                </tr>
                            </thead>
                            <tbody>

                                {this.showCart()}

                            </tbody>

                        </table>

                    </div>
                    {this.totalCart()}
                </div>
            </div>

        );
    }
}
export default Cart