import React, { Component } from 'react'
import axios from 'axios'
import FormErrors from '../../Error/FormErrors'
class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            category: "",
            brand: "",
            name: "",
            price: "",
            status: "",
            file: [],
            detail: "",
            sale: 0, // gia tri ban dau
            company: "",
            avatar: "",
            formError: {},
            getCategory: [],
            getBrand: [],
            new: 1,
            show_input_field: false

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeOption = this.handleChangeOption.bind(this)
        this.handleChangeFile = this.handleChangeFile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    handleChange(e) {
        const inputName = e.target.name
        let value = e.target.value;
        this.setState({
            [inputName]: value
        })
    }

    handleChangeOption(e) {
        const inputName = e.target.name
        let value = e.target.value;
        this.setState({
            [inputName]: value
        })
        if (value == "0")
            this.setState({
                show_input_field: true,
            });
        else
            this.setState({
                show_input_field: false,
                sale: 0
            });

    }

    handleChangeFile(e) {
        let files = e.target.files

        this.setState({
            file: files
        })
        console.log(this.state.file)

    }
    handleSubmit(e) {
        e.preventDefault()
        // console.log("hello")
        // let category = this.state.category
        // let brand = this.state.brand
        // let name = this.state.name
        // let price = this.state.price
        // let status = this.state.status
        let file = this.state.file

        // let detail = this.state.detail
        let avatar = this.state.avatar
        let company = this.state.company
        let flag = true
        let sumbmitError = this.state.formError
        // if (category == "") {
        //     flag = false
        //     sumbmitError.category = "Category khong duoc bo trong"
        // }
        // if (brand == "") {
        //     flag = false
        //     sumbmitError.brand = "Brand khong duoc bo trong"
        // }
        // if (name == "") {
        //     flag = false
        //     sumbmitError.name = "Name khong duoc bo trong"
        // }
        // if (status == "") {
        //     flag = false
        //     sumbmitError.status = "status khong duoc bo trong"
        // }
        // if (price == "") {
        //     flag = false
        //     sumbmitError.price = "price khong duoc bo trong"
        // }
        // if (detail == "") {
        //     flag = false
        //     sumbmitError.detail = "detail khong duoc bo trong"
        // }
        // if (company == "") {
        //     flag = false
        //     sumbmitError.company = "company khong duoc bo trong"
        // }
        // if (avatar == '' || avatar == null) {
        //     flag = false
        //     sumbmitError.avatar = "Avatar không được bỏ trống"
        // }
        if (file.length > 0) {
            // file.map((item, i) => {
            //     let type = item.type.toLowerCase() // PNG - > png
            //     let typeSplit = type.split('/') // '/png' -> 'png' 
            //     let regex = ["png", "jpg", "jpeg"]
            //     if (item.size > 1024 * 1024) {
            //         flag = false
            //         sumbmitError.avatar = "Kích thước không hợp lệ"
            //     } else if (!regex.includes(typeSplit[1])) {
            //         flag = false
            //         sumbmitError.avatar = "Loại hình ảnh không hợp lệ"
            //     }
            // })
        }
        if (file.length > 3) {
            flag = false
            sumbmitError.avatar = "Số lượng ảnh không qua 3 ảnh"
        }



        if (!flag) {
            this.setState({
                formError: sumbmitError
            })
        }
        else {
            const userData = JSON.parse(localStorage["infoLogin"])
            let url = 'http://localhost/laravel/public/api/user/add-product'
            let accessToken = userData.success.token
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            }

            const formData = new FormData();
            formData.append('name', this.state.name)
            formData.append('price', this.state.price)
            formData.append('category', this.state.category)
            formData.append('brand', this.state.brand)
            formData.append('company', this.state.company)
            formData.append('detail', this.state.detail)
            formData.append('status', this.state.status)
            formData.append('sale', this.state.sale)
            Object.keys(file).map((item, i) => {
                formData.append("file[]", file[item])
            })
            axios.post(url, formData, config)
                .then(res => {
                    if (res.data.data) {
                        console.log(res.data)
                        this.props.history.push('./account/product/list')
                    }
                    else {
                        console.log('chưa đc')
                    }

                })
        }

    }

    componentDidMount() {
        axios.get("http://localhost/laravel/public/api/category-brand")
            .then(res => {
                this.setState({
                    getCategory: res.data.category,
                    getBrand: res.data.brand

                })
                // console.log(res.data.category)
            })
    }
    renderCategory() {
        let getCategory = this.state.getCategory
        // console.log(category)
        return getCategory.map(function (cate) {
            return (<option value={cate.id}>{cate.category}</option>)

        })

    }
    renderBrand() {
        let getBrand = this.state.getBrand
        // console.log(getBrand)
        return getBrand.map(function (item) {
            return (<option value={item.id}>{item.brand}</option>)
        })
    }
    renderForm() {
        const { show_input_field } = this.state;
        return (
            <div>
                <FormErrors formError={this.state.formError} />
                <form className="contact-form row" name="contact-form" onSubmit={this.handleSubmit} enctype="multipart/form-data" >
                    <div className="form-group col-md-12">
                        <input type="text" name="name" value={this.state.name} onChange={this.handleChange} className="form-control" placeholder="Name" defaultValue />
                    </div>
                    <div className="form-group col-md-12">
                        <input type="text" className="form-control" id="display" name='price' onChange={this.handleChange} value={this.state.price} placeholder="Price" />
                    </div>
                    <div className="form-group col-md-12">
                        <select name="category" value={this.state.category} onChange={this.handleChange} >
                            <option value="" disabled selected hidden>Please choose category</option>
                            {this.renderCategory()}
                        </select>
                    </div>
                    <div className="form-group col-md-12">
                        <select name="brand" value={this.state.brand} onChange={this.handleChange}>
                            <option value="" disabled selected hidden>Please choose brand</option>
                            {this.renderBrand()}
                        </select>
                    </div>
                    <div className="form-group col-md-3">
                        Status of product
                    </div>
                    <div className="form-group col-md-9">
                        <select className="form-group col-md-12" name="status" value={this.state.status} onChange={this.handleChangeOption} >
                            <option value="1">New</option>
                            <option value="0">Sale</option>
                        </select>
                        {show_input_field ? <input type="text" id="value_sale" name="sale" value={this.state.sale} onChange={this.handleChange}></input> : ""}
                        {/* <input type="text" id="value_sale" name="sale" value={this.state.sale} onChange={handleChange} />%  */}
                    </div>
                    <div className="form-group col-md-12">
                        <textarea name="company" value={this.state.company} onChange={this.handleChange} id="company" className="form-control" placeholder="Company" />
                    </div>
                    <div className="form-group col-md-12">
                        <input type="file" id="files" name="files" multiple className="form-control" onChange={this.handleChangeFile} />

                    </div>
                    <div className="form-group col-md-12">
                        <textarea name="detail" id="detail" value={this.state.detail} onChange={this.handleChange} className="form-control" placeholder="Detail" />
                    </div>

                    <div className="form-group col-md-12">
                        <input type="submit" name="submit" className="btn btn-primary pull-right" />
                    </div>
                </form>
            </div>
        )
    }
    render() {
        return (
            <div className="col-sm-9 padding-right">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header"><h3>Add Product</h3></div>
                        <br />
                        <div className="card-body">
                            {this.renderForm()}
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}
export default Add