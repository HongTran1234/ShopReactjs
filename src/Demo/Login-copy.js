import React, { Component } from 'react';
// import { Link } from "@reach/router";
// import axios from 'axios'; // npm install axios
import Register from './Register';
import ErrorForm from '../Error/ErrorForm';
import API from '../Config/Api';
import { withRouter } from 'react-router-dom';

import { AppContext } from '../AppContext'

class Login extends Component {
    static contextType = AppContext;

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            formErrors: {},
            user: '',
            demo: 1
        }

        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        this.setState({
            demo: 2
        })
    }

    handleInput(e) {
        const nameInput = e.target.name;
        const value = e.target.value;

        this.setState({
            [nameInput]: value
        })
    }

    handleSubmit(e) {
        e.preventDefault();

        // this.context.st();
        let flag = true
        let email = this.state.email;
        let password = this.state.password;
        // let errorSubmit = [];
        let errorSubmit = this.state.formErrors;

        if (!email) {
            flag = false;
            // errorSubmit.push("Vui long nhap email");
            errorSubmit.email = "Vui long nhap email";
        }
        if (!password) {
            flag = false;
            errorSubmit.password = "Vui long nhap password";
        }

        if (!flag) {
            this.setState({
                formErrors: errorSubmit
            });
        }

        if (flag) {
            const data = {
                email: this.state.email,
                password: this.state.password,
                level: 0
            }
            // var formData = new FormData();
            // formData.append("email", this.state.email);
            // formData.append("password", this.state.password);

            API.post('login', data)

                .then(response => {

                    if (response.data.success) {

                        let userData = {
                            auth_token: response.data.success.token,
                            auth: response.data.Auth
                        };

                        let appState = {
                            isLoggedIn: true,
                            user: userData
                        };
                        // save app state with user date in local storage
                        localStorage.setItem('appState', JSON.stringify(appState));

                        // localStorage["appState"] = JSON.stringify(appState);
                        this.setState({
                            // isLoggedIn: appState.isLoggedIn,
                            user: appState.user
                        });

                        // set state to context
                        this.context.loginContext(true)

                        this.props.history.push('/')
                    } else {

                        this.setState({
                            formErrors: response.data.errors
                        })
                    }

                })
                .catch(function (error) {
                    console.log(error)
                })
        }

    }

    render() {
        // console.log(this.state.demo)
        return (
            <section id="form">
                <div className="container">
                    <div className="row">

                        {/* login */}
                        <div className="col-sm-4 col-sm-offset-1">
                            <div className="login-form">
                                <h2>Login to your account</h2>
                                <ErrorForm formErrors={this.state.formErrors} />
                                <form onSubmit={this.handleSubmit} >
                                    <input type="text" placeholder="Email" name="email" onChange={this.handleInput} />
                                    <input type="password" name="password" onChange={this.handleInput} />
                                    <span>
                                        <input type="checkbox" className="checkbox" />
                                        Keep me signed in
                                    </span>
                                    <button type="submit" className="btn btn-default">Login</button>
                                </form>
                            </div>
                        </div>

                        {/*  */}
                        <div className="col-sm-1">
                            <h2 className="or">OR</h2>
                        </div>
                        {/* register */}

                        <Register />

                    </div>
                </div>
            </section>
        )
    }
}

export default withRouter(Login);

