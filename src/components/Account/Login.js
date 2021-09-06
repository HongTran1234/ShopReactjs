import React, { Component, useState } from 'react'
import FormErrors from '../Error/FormErrors'
import axios from 'axios'
import { AppContext } from '../Product/AppContext'
import { useDispatch, useSelector } from 'react-redux'
import { txLogin } from '../action/login'

import PropTypes from 'prop-types';

function Login(props) {
    const dispatch = useDispatch()
    const [email, setemail] = useState('')
    const [password, setpass] = useState('')
    const [formError, setForm] = useState({})

    // }


    // class Login extends Component {
    // static contextType = AppContext
    // constructor(props) {
    //     super(props)
    //     this.state = {
    //         email: "",
    //         password: "",
    //         formError: {},

    //     }
    // this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
    // }
    function handleChangeEmail(e) {
        setemail(e.target.value)
    }
    function handleChangePass(e) {
        setpass(e.target.value)
    }
    //  handleChange(e) {
    //     const inputName = e.target.name
    //     const value = e.target.value
    //     this.setState({
    //         [inputName]: value
    //     })
    // }
    function handleSubmit(e) {
        e.preventDefault()
        // let password = this.state.password
        // let email = this.state.email
        let flag = true
        let submitError = formError
        if (email == "") {
            flag = false
            submitError.email = "Email không được bỏ trống"
        }
        if (password == "") {
            flag = false
            submitError.password = "Password không được bỏ trống"
        }
        if (!flag) {
            // this.setState({
            //     formError: submitError
            // })
            setForm(submitError)
        }
        if (flag) {

            const data = {
                email: email,
                password: password,
                level: 0
            }
            let url = "http://localhost/laravel/public/api/login"
            axios.post(url, data)
                .then(res => {
                    // console.log(res)
                    if (res.data.errors) {

                        setForm(res.data.errors)

                        console.log(res.data.errors)
                    } else {
                        alert("Đăng nhập thành công")

                        // const checkLogin = true
                        // localStorage.setItem("checkLogin", JSON.stringify(checkLogin));
                        const infoLogin = res.data
                        localStorage.setItem("infoLogin", JSON.stringify(infoLogin))

                        // redux
                        const checkLogin = true

                        const action = txLogin(checkLogin)
                        dispatch(action)



                        //set state to context
                        // this.context.loginContext(true)
                        this.props.history.push("/")

                    }
                })
                .catch(error => {
                    // console.log(error)
                })
        }
    }
    function renderForm() {
        return (
            <div>
                <FormErrors formError={formError} />

                <form onSubmit={handleSubmit}>

                    <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">E-Mail Address</label>
                        <div className="col-md-6">
                            <input value={email} type="email" onChange={handleChangeEmail} className="form-control " name="email" />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-md-4 col-form-label text-md-right">Password</label>
                        <div className="col-md-6">
                            <input type="password" value={password} onChange={handleChangePass} className="form-control " name="password" />
                        </div>
                    </div>
                    <div className="form-group row mb-0">
                        <div className="col-md-8 offset-md-4">
                            <button type="submit" className="btn btn-primary">
                                Login
                            </button>
                        </div>
                    </div>
                </form>

            </div >
        )

    }

    return (
        <div className="col-md-8">
            <div className="card">
                <div className="card-header">Login Member</div>
                <div className="card-body">
                    <br />
                    {renderForm()}
                </div>
            </div>
        </div>
    );

}
export default Login
