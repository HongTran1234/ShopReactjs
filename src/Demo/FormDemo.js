import React, { Component } from 'react'
import FormError from './FormError'
class FormDemo extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            namee: "",
            phone: "",
            errorForm: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
        const nameInput = e.target.name
        const value = e.target.value
        this.setState({
            [nameInput]: value
        })
    }
    handleSubmit(e) {
        e.preventDefault()
        let email = this.state.email
        let password = this.state.password
        let namee = this.state.namee
        let phone = this.state.phone
        let erroSubmit = this.state.errorForm
        let flag = true
        if (!email) {
            flag = false
            erroSubmit.email = "Vui long nhap email"
        }
        if (!password) {
            flag = false
            erroSubmit.password = "Vui long nhap pass"
        }
        if (!namee) {
            flag = false
            erroSubmit.name = "Vui long nhap name"
        }
        if (!phone) {
            flag = false
            erroSubmit.phone = "Vui long nhap phone"
        }
        if (!flag) {
            this.setState({
                errorForm: erroSubmit
            })
        }
    }
    render() {
        return (
            <div>
                <FormError errorForm={this.state.errorForm} />
                <form onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.email} name="email" placeholder="Email" onChange={this.handleChange}></input><br />
                    <input type="password" value={this.state.password} name="password" placeholder="Password" onChange={this.handleChange}></input><br />
                    <input type="text" value={this.state.namee} name="namee" placeholder="Name" onChange={this.handleChange}></input><br />
                    <input type="number" value={this.state.phone} name="phone" placeholder="Phone" onChange={this.handleChange}></input><br />
                    <button type="submit">Add</button>
                </form>
            </div>
        );
    }
}
export default FormDemo
