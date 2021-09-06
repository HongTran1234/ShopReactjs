import React, { Component } from 'react'
class Login_ extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
            errorEmail: "",
            errorPass: ""

        }
        this.handleEmail = this.handleEmail.bind(this)
        this.handlePass = this.handlePass.bind(this)
        this.handleSub = this.handleSub.bind(this)
    }

    handleEmail(e) {
        this.setState({ email: e.target.value })
    }
    handlePass(e) {
        this.setState({ password: e.target.value })
    }
    handleSub(e) {
        e.preventDefault()
        let email = this.state.email
        let password = this.state.password
        if (!email) {
            this.setState({
                errorEmail: "Vui long nhap Email"
            })

        }
        if (!password) {
            this.setState({
                errorPass: "Vui long nhap Pass"
            })
        }
    }
    render() {
        return (
            <form onSubmit={this.handleSub}>
                <input type="text" onChange={this.handleEmail} value={this.state.email}></input>
                <p>{this.state.errorEmail}</p>
                <input type="password" onChange={this.handlePass} value={this.state.password}></input>
                <p>{this.state.errorPass}</p>
                <button type="submit">Send</button>
            </form>
        );
    }
}
export default Login_