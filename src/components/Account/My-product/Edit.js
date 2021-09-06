import React, { Component } from "react"
import axios from "axios";
import FormErrors from '../../Error/FormErrors'
class Edit extends Component {
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
            show_input_field: false,
            id_user: "",
            avatarCheckBox: [],
            Checke: false,
            files: []


        }
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeOption = this.handleChangeOption.bind(this)
        this.handleChangeFile = this.handleChangeFile.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.likeClicked = this.likeClicked.bind(this)

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
    likeClicked = (e, valueImage) => {
        if (e.target.checked) {
            this.state.avatarCheckBox.push(valueImage);
        }
        else {
            this.state.avatarCheckBox = this.state.avatarCheckBox.filter(img => img != valueImage);
        }

    }

    handleSubmit(e) {
        e.preventDefault()

        let file = this.state.file
        let files = this.state.files
        let avatarCheckBox = this.state.avatarCheckBox
        let flag = true
        let sumbmitError = this.state.formError

        // if (file && file.length > 0) {
        //     file.map((item, i) => {
        //         let type = item.type.toLowerCase() // PNG - > png
        //         let typeSplit = type.split('/') // '/png' -> 'png' 
        //         let regex = ["png", "jpg", "jpeg"]
        //         if (item.size > 1024 * 1024) {
        //             flag = false
        //             sumbmitError.avatar = "Kích thước không hợp lệ"
        //         } else if (!regex.includes(typeSplit[1])) {
        //             flag = false
        //             sumbmitError.avatar = "Loại hình ảnh không hợp lệ"
        //         }
        //     })

        // }
        let sum = file.length + files.length - avatarCheckBox.length
        // console.log(sum)
        if (sum > 3) {
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
            let url = `http://localhost/laravel/public/api/user/edit-product/${this.props.match.params.id}`
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
            Object.keys(avatarCheckBox).map((item, i) => {
                formData.append("avatarCheckBox[]", avatarCheckBox[item])
            })
            axios.post(url, formData, config)
                .then(res => {
                    if (res.data) {
                        console.log(res.data)
                    }
                    else {
                        console.log('Loi')
                    }

                })
        }


    }

    componentDidMount() {

        const userData = JSON.parse(localStorage["infoLogin"])
        let url = `http://localhost/laravel/public/api/user/product/${this.props.match.params.id}`
        // console.log(userData)
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
                    // console.log(res.data.data)
                    this.setState({
                        category: res.data.data.id_category,
                        brand: res.data.data.id_brand,
                        name: res.data.data.name,
                        price: res.data.data.price,
                        status: res.data.data.status,
                        files: res.data.data.image,
                        detail: res.data.data.detail,
                        sale: res.data.data.sale,
                        company: res.data.data.company_profile,
                        id_user: res.data.data.id_user
                    })

                }
            })
        axios.get("http://localhost/laravel/public/api/category-brand")
            .then(res => {
                this.setState({
                    getCategory: res.data.category,
                    getBrand: res.data.brand

                })

            })
    }
    showImages() {
        let files = this.state.files
        let id_user = this.state.id_user

        // 0,1
        return Object.keys(files).map((item) => {

            return (
                <>
                    <input type="checkbox" onChange={(e) => this.likeClicked(e, files[item])} />
                    <label htmlFor="myCheck"><img className="list-img-product" width="50px" height="50px" src={'http://localhost/laravel/public/upload/user/product/' + id_user + '/' + files[item]} /></label>
                </>

            )

        })


    }
    getName() {

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
                        {this.showImages()}
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
                        <div className="card-header"><h3>Edit Product</h3></div>
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
export default Edit