import React, { useState } from 'react';
import PropTypes from 'prop-types';
import FormErrors from '../Error/FormErrors';
import Detail_hook from './Detail_hook';
import axios from 'axios';
function Comment_hook(props) {
    const [comment, setComment] = useState("")
    const [formError, setError] = useState({})

    function handleChange(e) {
        setComment(e.target.value)
    }
    function handlePost(e) {
        e.preventDefault()
        const checkLogin = localStorage.getItem("checkLogin")
        const userData = JSON.parse(localStorage["infoLogin"])
        let url = 'http://localhost/laravel/public/api/blog/comment/' + props.idBlog
        let accessToken = userData.success.token;
        console.log(props.idBlog)
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        if (checkLogin == "true") {
            setComment(comment)
            if (comment) {
                const formData = new FormData();
                formData.append('id_blog', props.idBlog);
                formData.append('id_user', userData.Auth.id);
                formData.append('id_comment', props.id ? props.id : 0);

                formData.append('comment', comment);
                formData.append('image_user', userData.Auth.avatar);
                formData.append('name_user', userData.Auth.name);
                axios.post(url, formData, config)
                    .then(res => {
                        if (res.data.data) {
                            console.log(res.data.data)
                            props.getComment(res.data.data)
                        }
                        else
                            if (res.data.errors) {
                                setError(res.data.errors)
                            }
                    })

            }
        }
        else {
            alert("Vui long login")
        }
    }
    return (
        <>
            <FormErrors formError={formError} />
            <div className="replay-box">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Leave a replay</h2>
                        <div className="text-area">
                            <div className="blank-arrow">
                                <label>Your Name</label>
                            </div>
                            <span>*</span>
                            <textarea name="comment" value={comment} onChange={handleChange} rows={11} defaultValue={""} />
                            <button className="btn btn-primary" onClick={handlePost}>post comment</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Comment_hook;