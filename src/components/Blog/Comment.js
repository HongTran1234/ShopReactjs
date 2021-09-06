import React, { Component } from 'react'
import FormErrors from '../Error/FormErrors'
import axios from 'axios'
class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: " ",
            formError: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handlePost = this.handlePost.bind(this)
    }

    handleChange(e) {
        const getName = e.target.name
        const value = e.target.value
        this.setState({
            [getName]: value
        })
    }
    handlePost(e) {
        e.preventDefault()
        const checkLogin = localStorage.getItem("checkLogin")
        if (checkLogin == "true") {

            const userData = JSON.parse(localStorage["infoLogin"])
            let url = 'http://localhost/laravel/public/api/blog/comment/' + this.props.idBlog
            let accessToken = userData.success.token;
            // console.log(this.props.idBlog)
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };
            let { comment } = this.state
            let getComment = this.props.getComment
            if (comment) {
                const formData = new FormData();
                formData.append('id_blog', this.props.idBlog);
                formData.append('id_user', userData.Auth.id);
                formData.append('id_comment', this.props.id ? this.props.id : 0);

                formData.append('comment', this.state.comment);
                formData.append('image_user', userData.Auth.avatar);
                formData.append('name_user', userData.Auth.name);
                axios.post(url, formData, config)
                    .then(res => {
                        if (res.data.data) {
                            console.log(res.data)

                            getComment(res.data.data)
                        }
                        else
                            if (res.data.errors) {
                                this.setState({
                                    formError: res.data.errors
                                })
                                console.log(res.data.errors)
                            }
                    })
            }
        }
        else {
            alert("Vui lòng login")
            // props.history.push('/login')
        }
    }

    render() {
        console.log(this.props.id)
        return (
            <div>
                <FormErrors formError={this.state.formError} />
                <div className="replay-box">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>Leave a replay</h2>
                            <div className="text-area">
                                <div className="blank-arrow">
                                    <label>Your Name</label>
                                </div>
                                <span>*</span>
                                <textarea name="comment" value={this.state.comment} onChange={this.handleChange} rows={11} defaultValue={""} />
                                <button className="btn btn-primary" onClick={this.handlePost}>post comment</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}
export default Comment
