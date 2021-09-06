import React, { Component } from 'react'
import axios from 'axios';

import {
    Link,
} from "react-router-dom"
class List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            name: "",
            price: "",
            status: "",
            file: [],
            product: {}
        }
        this.deleteRow = this.deleteRow.bind(this)
    }
    componentDidMount() {
        const userData = JSON.parse(localStorage["infoLogin"])

        // console.log(userData)
        let url = `http://localhost/laravel/public/api/user/my-product`
        let accessToken = userData.success.token
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }

        axios.get(url, config)
            .then(res => {
                if (res.data.data) {
                    let tam = [];
                    tam = res.data.data;
                    Object.keys(tam).map((item, i) => {
                        tam[item].image = JSON.parse(tam[item].image);
                    });
                    this.setState({
                        product: tam,

                    })
                    console.log(tam)
                }

            })


    }
    deleteRow(id) {
        const userData = JSON.parse(localStorage["infoLogin"])
        let product = this.state.product
        let accessToken = userData.success.token
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        }
        axios.get(`http://localhost/laravel/public/api/user/delete-product/${id}`, config)
            .then(res => {
                if (res.data.data) {
                    this.setState({
                        product: res.data.data
                    })
                }
            })

    }

    showProduct() {

        let product = this.state.product
        // console.log(product)
        return Object.keys(product).map((item, i) => {
            return (
                <tr key={i}>
                    <th>{product[item].id}</th>
                    <td>{product[item].name}</td>
                    <td>$ {product[item].price}</td>
                    <td><img width="50px" height="50px" src={'http://localhost/laravel/public/upload/user/product/' + product[item].id_user + '/' + product[item].image[0]}></img></td>
                    <td>
                        <Link to={"/account/product/edit/" + product[item].id} className="edit-product" >
                            Edit</Link>


                        <a className="delete-product" onClick={() => this.deleteRow(product[item].id)}>
                            {/* <i class="fa fa-times"></i> */}
                            Delete
                        </a>
                    </td>
                </tr >
            )
        })

    }
    render() {

        return (
            <div className="col-sm-9">
                <h3>Your Product</h3>
                <div className="table-responsive">
                    <table className="table table-condensed">
                        <thead>
                            <tr className="menu-product">
                                <th className="products id-product">Id</th>
                                <th className="products name-product">Name</th>
                                <th className="products price-product">Price</th>
                                <th className="products image-product">Image</th>
                                <th className="products action-product">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.showProduct()}
                        </tbody>
                    </table>
                </div>
                <Link to="/account/product/add"><button className="btn btn-primary pull-right">Add product</button></Link>
            </div>
        );
    }
}
export default List