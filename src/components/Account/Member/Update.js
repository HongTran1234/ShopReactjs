import React, { Component } from 'react'
import axios from 'axios'
// import FormErrors from './Error/FormErrors'
class Update extends Component {
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
            formError: {},
            readOnly: true

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
            const userData = JSON.parse(localStorage["infoLogin"])
            let url = 'http://localhost/laravel/public/api/user/update/' + userData.Auth.id
            let accessToken = userData.success.token;
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            const formData = new FormData();
            formData.append('id', userData.Auth.id);
            formData.append('name', this.state.name);
            formData.append('email', this.state.email);
            formData.append('password', this.state.password);
            formData.append('phone', this.state.phone);
            formData.append('address', this.state.address);
            formData.append('country', this.state.country);
            formData.append('avatar', this.state.avatar);

            axios.post(url, formData, config)
                .then(res => {
                    if (res.data) {
                        console.log(res.data)
                        let infoLogin = res.data
                        localStorage.setItem("infoLogin", JSON.stringify(infoLogin))
                    }
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
    componentDidMount() {
        var infoLogin = JSON.parse(localStorage.getItem('infoLogin'));
        // console.log(infoLogin)
        if (localStorage.getItem('infoLogin')) {
            this.setState({
                name: infoLogin.Auth.name,
                email: infoLogin.Auth.email,
                password: infoLogin.Auth.email,
                avatar: infoLogin.Auth.avatar,
                address: infoLogin.Auth.address,
                phone: infoLogin.Auth.phone,
                country: infoLogin.Auth.country
            })

        }
    }
    formUpdate() {
        return (
            <div>
                {/* <FormErrors formError={this.state.formError} enctype="multipart/form-data" /> */}
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
                            <input type="text" className="form-control " name="email" value={this.state.email} readOnly={this.state.readOnly} onChange={this.handleChange} />
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
                                Signup
                            </button>
                        </div>
                    </div>
                </form>

            </div>
        )
        // })

    }
    render() {
        return (
            <div className="col-md-9">
                <h5>Update Member</h5>
                {this.formUpdate()}
            </div>
        );
    }
}
export default Update