import React, { Component } from "react"
import axios from "axios";
import {
    PopupboxManager,
    PopupboxContainer
} from 'react-popupbox';
import "react-popupbox/dist/react-popupbox.css"
class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detail: {},
            image: "",
            user: "",
            listImage: [],
            qty: 1
        }
        this.openPopupbox = this.openPopupbox.bind(this)
        this.changeQuantity = this.changeQuantity.bind(this)
        this.addToCart = this.addToCart.bind(this)
    }

    componentDidMount() {
        let url = `http://localhost/laravel/public/api/product/detail/${this.props.match.params.id}`
        axios.get(url)
            .then(res => {
                if (res.data.data) {
                    console.log(res.data.data)
                    const tam = res.data.data
                    tam.image = JSON.parse(tam.image)
                    this.setState({
                        detail: tam,
                        image: tam.image[0],
                        user: tam.id_user,
                        listImage: tam.image


                    })
                }
            })


    }
    changeQuantity(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    openPopupbox() {
        // console.log("fff")
        const user = this.state.user
        const image = this.state.image
        const url = `http://localhost/laravel/public/upload/user/product/` + user + "/" + image
        const content = <img src={url} alt="" />
        PopupboxManager.open({
            content
        })
    }
    openPopupImage(image) {
        this.setState({
            image: image
        })
    }
    showImage() {
        let listImage = this.state.listImage
        let user = this.state.user
        return Object.keys(listImage).map((item) => {
            return (
                <img onClick={() => this.openPopupImage(listImage[item])} src={`http://localhost/laravel/public/upload/user/product/` + user + "/" + "small_" + listImage[item]}></img>
            )
        })
    }
    addToCart(id) {
        console.log("dd")
        let objCart = JSON.parse(localStorage.getItem("objCart"));
        let qty = this.state.qty
        qty = new Number(qty)

        if (objCart == null) {
            objCart = { [id]: qty };
        }
        else {
            if (objCart[id]) {
                objCart[id] = objCart[id] + qty;
            }
            else {
                objCart[id] = 1;
            }
        }
        localStorage.setItem("objCart", JSON.stringify(objCart))

    }
    renderDetail() {
        const detail = this.state.detail
        const image = this.state.image

        return (
            <>
                <div className="product-details">
                    {/*product-details*/}
                    <div className="col-sm-5">
                        <div className="view-product">
                            <img src={`http://localhost/laravel/public/upload/user/product/` + detail.id_user + "/" + "larger_" + image} alt="" />
                            <div >
                                <button onClick={this.openPopupbox}>ZOOM</button>
                                <PopupboxContainer />
                            </div>

                        </div>
                        <div id="similar-product" className="carousel slide" data-ride="carousel">
                            {/* Wrapper for slides */}
                            <div className="carousel-inner">
                                <div className="item active">
                                    {this.showImage()}
                                </div>
                                {/* <div className="item">
                               
                            </div>
                            <div className="item">
                               
                            </div> */}
                            </div>
                            {/* Controls */}
                            <a className="left item-control" href="#similar-product" data-slide="prev">
                                <i className="fa fa-angle-left" />
                            </a>
                            <a className="right item-control" href="#similar-product" data-slide="next">
                                <i className="fa fa-angle-right" />
                            </a>
                        </div>
                    </div>
                    <div className="col-sm-7">
                        <div className="product-information">
                            {/*/product-information*/}
                            <img src="images/product-details/new.jpg" className="newarrival" alt="" />
                            <h2>{detail.name}</h2>
                            <p>ID: {detail.id}</p>
                            <img src="images/product-details/rating.png" alt="" />
                            <span>
                                <span>US </span> <span>{detail.price} $</span>
                                <label>Quantity:</label>
                                <input type="text" value={this.state.qty} name="qty" onChange={this.changeQuantity} />
                                <button type="button" className="btn btn-fefault cart" onClick={() => this.addToCart(detail.id)}>
                                    <i className="fa fa-shopping-cart" />
                                    Add to cart
                                </button>
                            </span>
                            <p><b>Availability:</b> In Stock</p>
                            <p><b>Condition:</b> {detail.status}</p>
                            <p><b>Brand:</b> {detail.id_brand}</p>
                            <a href><img src="images/product-details/share.png" className="share img-responsive" alt="" /></a>
                        </div>
                        {/*/product-information*/}
                    </div>
                </div>
                <div className="category-tab shop-details-tab">
                    {/*category-tab*/}
                    <div className="col-sm-12">
                        <ul className="nav nav-tabs">
                            <li><a href="#details" data-toggle="tab">Details</a></li>
                            <li><a href="#companyprofile" data-toggle="tab">Company Profile</a></li>
                            <li><a href="#tag" data-toggle="tab">Tag</a></li>
                            <li className="active"><a href="#reviews" data-toggle="tab">Reviews (5)</a></li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <div className="tab-pane fade active in" id="reviews">
                            <div className="col-sm-12">
                                <ul>
                                    <li><a href><i className="fa fa-user" />EUGEN</a></li>
                                    {/* <li><a href><i className="fa fa-clock-o" />12:41 PM</a></li> */}
                                    <li><a href><i className="fa fa-calendar-o" />{detail.updated_at}</a></li>
                                </ul>
                                <p>{detail.detail}</p>
                                <p><b>Write Your Review</b></p>
                                <form action="#">
                                    <span>
                                        <input type="text" placeholder="Your Name" />
                                        <input type="email" placeholder="Email Address" />
                                    </span>
                                    <textarea name defaultValue={""} />
                                    <b>Rating: </b> <img src="images/product-details/rating.png" alt="" />
                                    <button type="button" className="btn btn-default pull-right" onClick={this.Click}>
                                        Submit
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
    render() {
        // console.log(this.state.user)
        return (
            <div className="col-sm-9 padding-right">
                <div className="col-md-12 padding-right">
                    {this.renderDetail()}
                </div>
            </div>
        );
    }
}
export default ProductDetail