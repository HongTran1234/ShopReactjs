import React, { Component } from 'react'
import FormError from './FormError'
class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errorForm: {}
        }
        this.handleInput = this.handleInput.bind(this)
        this.handleSub = this.handleSub.bind(this)
    }
    handleInput(e) {
        const nameInput = e.target.name
        const value = e.target.value
        this.setState({
            [nameInput]: value
        })
    }
    handleSub(e) {
        e.preventDefault();
        let email = this.state.email
        let password = this.state.password
        let subError = {}
        let flag = true
        if (!email) {
            flag = false
            subError.email = "Vui long nhap email"
        }
        if (!password) {
            flag = false
            subError.password = "Vui lòng nhap pass"
        }
        if (!flag) {
            this.setState({
                errorForm: subError
            })
        }
    }
    // renderForm() {
    //     const errorForm = this.state.errorForm
    //     if (Object.keys(errorForm).length > 0) {
    //         return Object.keys(errorForm).map((key, index) => {
    //             return (
    //                 <p>{errorForm[key]}</p>
    //             )
    //         })
    //     }
    // }
    render() {
        return (
            <div>
                {/* <p>{this.renderForm()}</p> */}
                <FormError errorForm={this.state.errorForm} />
                <form onSubmit={this.handleSub}>
                    <input type="text" value={this.state.email} t name="email" placeholder="Email" onChange={this.handleInput}></input>
                    <input type="password" name="password" value={this.state.password} placeholder="Password" onChange={this.handleInput}></input>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}
export default LoginForm
