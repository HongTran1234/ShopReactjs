import React, { Component } from 'react'
import axios from 'axios';
import { Link } from "react-router-dom"
import { AppContext } from './AppContext'
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            product: [],
            qty: 1
        }
        this.addToCart = this.addToCart.bind(this)
    }
    static contextType = AppContext
    componentDidMount() {
        const url = "http://localhost/laravel/public/api/product"
        axios.get(url)
            .then(res => {
                let tam = [];
                tam = res.data.data;
                Object.keys(tam).map((item, i) => {
                    tam[item].image = JSON.parse(tam[item].image);
                });
                this.setState({
                    product: tam
                })
                console.log(this.state.product)
            })
    }
    addToCart(id) {
        // let value = this.context.cartContext(id)
        // console.log(value)
        let objCart = JSON.parse(localStorage.getItem("objCart"));
        if (objCart == null) {
            objCart = { [id]: 1 };
        }
        else {
            if (objCart[id]) {
                objCart[id] = objCart[id] + 1;
            }
            else {
                objCart[id] = 1;
            }
        }
        this.context.addToCart(objCart)
        // localStorage.setItem("objCart", JSON.stringify(objCart))
        // console.log(objCart)

    }
    showImage() {
        let product = this.state.product
        // if (product.lenght > 0) {
        return product.map((item) => {

            return (
                <div className="col-sm-4 home">
                    <div className="product-image-wrapper">
                        <div className="single-products">
                            <div className="productinfo text-center">
                                <img style={{ width: '242px', height: '252px' }} src={`http://localhost/laravel/public/upload/user/product/` + item.id_user + "/" + item.image[0]} alt="" />
                                <p className="price overlay">{item.price}</p>
                                <p>{item.name}</p>
                                <a className="btn btn-default add-to-cart add" ><i className="fa fa-shopping-cart" />Add to cart</a>
                            </div>
                            <div className="product-overlay">
                                <div className="overlay-content">
                                    <p className="price overlay">{item.price}</p>
                                    <p>{item.name}</p>


                                    <a onClick={() => this.addToCart(item.id)} className="btn btn-default add-to-cart add" data-toggle="modal" data-target="#myModal">
                                        <i className="fa fa-shopping-cart" />Add to cart
                                    </a>



                                </div>
                            </div>
                            {/* <img className="new" src="http://localhost/laravel/public/upload/icon/new.png" /> */}
                        </div>
                        <div className="choose">
                            <ul className="nav nav-pills nav-justified">
                                <li><Link to={"/product/detail/" + item.id}><i className="fa fa-plus-square" />Product detail</Link></li>
                                <li><a href="#"><i className="fa fa-plus-square" />Add to compare</a></li>
                            </ul>
                        </div>
                    </div>
                </div >
            )
        })
        // }
    }

    render() {

        return (
            <div className="col-sm-9 padding-right">
                <div className="features_items">{/*features_items*/}
                    <h2 className="title text-center">Features Items</h2>
                    {this.showImage()}
                    <p className="result_price" />
                </div>{/*features_items*/}
                <div className="modal" id="myModal">
                    <div style={{ margin: '100px auto' }} className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-body">
                                <button style={{ margin: '10px' }} type="button" className="close" data-dismiss="modal">×</button>
                            </div>
                            <div className="modal-body">
                                <p style={{ fontSize: '20px', display: 'inline-block' }} className="cart-alert" />
                            </div>
                            <div className="modal-footer">
                                <button type="button" id="button_modal" className="btn btn-success"><a style={{ color: '#fff' }} href="http://localhost/laravel/public/yourCart">Go to cart</a></button>
                                <button type="button" id="button_modal" className="btn btn-success" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}
export default Home