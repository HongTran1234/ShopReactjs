import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import StarRatings from 'react-star-ratings';
import axios from 'axios';
function Rate_hook(props) {
    const [rate, setRate] = useState(0)
    const [sumVote, setSum] = useState(0)
    function changeRating(newRating) {
        setRate(newRating)

        const checkLogin = localStorage.getItem("checkLogin")
        const userData = JSON.parse(localStorage["infoLogin"])
        let url = 'http://localhost/laravel/public/api/blog/rate/' + props.idBlog
        let accessToken = userData.success.token;
        // console.log(props.idBlog)
        let config = {
            headers: {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Accept': 'application/json'
            }
        };
        if (checkLogin == 'true') {
            const formData = new FormData();
            formData.append('blog_id', props.idBlog);
            formData.append('user_id', userData.Auth.id);
            formData.append('rate', newRating);
            axios.post(url, formData, config)
                .then(res => {
                    console.log(res.data)
                    // if (res.data.data)
                    //     console.log(res.data)

                })
        }
    }
    useEffect(() => {
        axios.get('http://localhost/laravel/public/api/blog/rate/' + props.idBlog)
            .then(res => {
                let tongRate = 0;
                if (Object.keys(res.data.data).length > 0) {
                    Object.keys(res.data.data).map(function (key) {
                        tongRate = tongRate + res.data.data[key].rate;
                    });
                    let lenghtTong = Object.keys(res.data.data).length;
                    let rateTb = tongRate / lenghtTong;
                    setRate(rateTb)
                    setSum(lenghtTong)
                }
            })
    }, [])

    return (
        <div className="rating-area">
            <ul className="ratings">
                <li className="rate-this">Rate this item:</li>

                <li>
                    <StarRatings
                        rating={rate}
                        starRatedColor="yellow"
                        changeRating={changeRating}
                        numberOfStars={5}
                        name='rating'
                    />
                </li>
                <li class="color"> {sumVote} vote</li>
            </ul>
            <ul className="tag">
                <li>TAG:</li>
                <li><a className="color" href>Pink <span>/</span></a></li>
                <li><a className="color" href>T-Shirt <span>/</span></a></li>
                <li><a className="color" href>Girls</a></li>
            </ul>
        </div>
    );
}

export default Rate_hook;