import React, { Component } from 'react'
import axios from 'axios'
import StarRatings from 'react-star-ratings';
class Rate extends Component {
    constructor(props) {
        super(props)
        this.state = {
            rate: 0,
            sumVote: 0,
        }
        this.changeRating = this.changeRating.bind(this)

    }

    changeRating(newRating) {
        this.setState({
            rate: newRating
        })
        console.log(newRating)
        console.log(this.props.idBlog)

        const checkLogin = localStorage.getItem("checkLogin")
        if (checkLogin == "true") {
            const userData = JSON.parse(localStorage["infoLogin"])
            let url = 'http://localhost/laravel/public/api/blog/rate/' + this.props.idBlog
            let accessToken = userData.success.token;
            // console.log(this.props.idBlog)
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + accessToken,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': 'application/json'
                }
            };


            const formData = new FormData();
            formData.append('blog_id', this.props.idBlog);
            formData.append('user_id', userData.Auth.id);
            formData.append('rate', newRating);
            axios.post(url, formData, config)
                .then(res => {
                    if (res.data.data) {
                        // console.log(res)

                        console.log(res.data.data)

                    }

                })
        }
    }
    componentDidMount() {
        const rate = this.state.rate;
        axios.get('http://localhost/laravel/public/api/blog/rate/' + this.props.idBlog)
            .then(res => {
                let tongRate = 0;
                if (Object.keys(res.data.data).length > 0) {
                    Object.keys(res.data.data).map(function (key) {
                        tongRate = tongRate + res.data.data[key].rate;
                    });
                    let lenghtTong = Object.keys(res.data.data).length;
                    let rateTb = tongRate / lenghtTong;
                    this.setState({
                        rate: rateTb,
                        sumVote: lenghtTong
                    })
                }

            })
            .catch(function (error) {
                console.log(error)
            })


    }
    render() {

        return (
            <div className="rating-area">
                <ul className="ratings">
                    <li className="rate-this">Rate this item:</li>

                    <li>
                        <StarRatings
                            rating={this.state.rate}
                            starRatedColor="yellow"
                            changeRating={this.changeRating}
                            numberOfStars={5}
                            name='rating'
                        />
                    </li>
                    <li class="color"> {this.state.sumVote} vote</li>
                </ul>
                <ul className="tag">
                    <li>TAG:</li>
                    <li><a className="color" href>Pink <span>/</span></a></li>
                    <li><a className="color" href>T-Shirt <span>/</span></a></li>
                    <li><a className="color" href>Girls</a></li>
                </ul>
            </div>
        )
    }
}
export default Rate
