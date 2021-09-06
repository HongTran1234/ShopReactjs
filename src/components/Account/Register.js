import React, { Component } from 'react'
import axios from 'axios'
import FormErrors from '../Error/FormErrors'
// import FormErrors from './Shop/FormErrors'
class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "",
            email: "",
            password: "",
            avatar: "",
            file: null,
            address: "",
            phone: "",
            country: "",
            Success: "",
            formError: {}

        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)


    }
    handleChange(e) {
        const inputName = e.target.name
        const value = e.target.value
        this.setState({
            [inputName]: value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        let name = this.state.name
        let email = this.state.email
        let password = this.state.password
        let avatar = this.state.avatar
        let address = this.state.address
        let phone = this.state.phone
        let country = this.state.country
        let file = this.state.file
        let flag = true
        let submitError = this.state.formError
        if (name == "") {
            flag = false
            submitError.name = "FullName không được bỏ trống"
        }
        if (email == "") {
            flag = false
            submitError.email = "Email không được bỏ trống"
        }
        if (password == "") {
            flag = false
            submitError.password = "Password không được bỏ trống"
        }
        if (avatar == '' || avatar == null) {
            flag = false
            submitError.avatar = "Avatar không được bỏ trống"
        }

        if (country == "") {
            flag = false
            submitError.country = "Country không được bỏ trống"
        }
        if (file && file.name !== "") {
            let type = file.type.toLowerCase() // PNG - > png
            let typeSplit = type.split('/') // '/png' -> 'png' 
            let regex = ["png", "jpg", "jpeg"]
            if (file.size > 1024 * 1024) {
                flag = false
                submitError.avatar = "Kích thước không hợp lệ"
            } else if (!regex.includes(typeSplit[1])) {
                flag = false
                submitError.avatar = "Loại hình ảnh không hợp lệ"
            }
        }

        if (!flag) {
            this.setState({
                formError: submitError
            })

        }
        if (flag) {
            const data = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                phone: this.state.phone,
                address: this.state.address,
                country: this.state.country,
                avatar: this.state.avatar,
                level: 0
            }
            let url = "http://localhost/laravel/public/api/register"

            axios.post(url, data)
                .then(res => {
                    console.log(res)
                    if (res.data.errors) {
                        this.setState({
                            formError: res.data.errors

                        })

                    } else {
                        this.setState({
                            Success: "Đăng kí thành công",

                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                })

        }
    }

    handleUserInputFile(e) {
        const file = e.target.files;

        let reader = new FileReader();

        reader.onload = (e) => {
            let value = e.target.result;
            this.setState({
                avatar: value,
                file: file[0],
            })
        };
        reader.readAsDataURL(file[0]);
    }
    formRes() {
        return (
            <div>
                <FormErrors formError={this.state.formError} enctype="multipart/form-data" />
                <p>{this.state.Success}</p>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Full Name (*)</label>
                        <div className="col-md-8">
                            <input type="text" className="form-control " name="name" value={this.state.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Email (*)</label>
                        <div className="col-md-8">
                            <input type="text" className="form-control " name="email" value={this.state.email} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Password (*)</label>
                        <div className="col-md-8">
                            <input type="password" className="form-control " name="password" value={this.state.password} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Phone</label>
                        <div className="col-md-8">
                            <input type="text" className="form-control " name="phone" value={this.state.phone} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Address</label>
                        <div className="col-md-8">
                            <input type="text" className="form-control " name="address" value={this.state.address} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Avatar (*)</label>
                        <div className="col-md-8">
                            <input type="file" accept="image/*" className="form-control " onChange={(e) => this.handleUserInputFile(e)} />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Country (*)</label>
                        <div className="col-md-8">
                            <select name="country" className="form-control form-control-line" value={this.state.country} onChange={this.handleChange}>
                                <option >Please select</option>
                                <option >
                                    vietnam
                                </option>
                                <option>
                                    anh
                                </option>
                                <option >
                                    phap
                                </option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <div className="col-md-8 offset-md-4">
                            <button type="submit" className="btn btn-primary">
                                Register
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )

    }
    render() {
        return (
            <div className="col-md-9">
                <h5>Register Member</h5>
                {this.formRes()}
            </div>
        );
    }
}
export default Register
