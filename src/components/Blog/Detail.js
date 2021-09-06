import React, { Component } from 'react'
import axios from 'axios';
import Comment from './Comment';
import ListComment from './ListComment'
import Rate from './Rate'
import { getByDisplayValue } from '@testing-library/react';

class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            comment: [],
            detail: {},
            count: 0,
            id: "",

        }
        this.getComment = this.getComment.bind(this)
        this.getID = this.getID.bind(this)

    }

    componentDidMount() {
        const comment = this.state.comment

        axios.get(`http://localhost/laravel/public/api/blog/detail/${this.props.match.params.id}`)
            .then(res => {
                const detail = res.data
                this.setState({
                    detail,
                    comment: res.data.data.comment,

                })


            })
            .catch(function (error) {
                console.log(error)
            })

    }


    getComment(data) {
        this.setState({
            comment: this.state.comment.concat(data)

        })
    }
    getID(id) {
        this.setState({
            id
        })
    }
    Idfetch() {

        let detail = this.state.detail.data;
        if (detail) {
            return (
                <div>
                    <div className="single-blog-post">
                        <h3>{detail.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user" /> Mac Doe</li>
                                <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                            </ul>
                            <span>
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star" />
                                <i className="fa fa-star-half-o" />
                            </span>
                        </div>
                        <a href>
                            <img src={'http://localhost/laravel/public/upload/blog/image/' + detail.image} alt="" />
                        </a>
                        <p>{detail.content}
                        </p>
                        <div className="pager-area">
                            <ul className="pager pull-right">
                                <li><a href="#">Pre</a></li>
                                <li><a href="#">Next</a></li>
                            </ul>
                        </div>
                    </div>

                </div>
            )
        }
    }


    render() {
        return (
            <div>
                <div className="col-sm-9">
                    <div className="blog-post-area">
                        <h2 className="title text-center">Latest From our Blog</h2>
                        {this.Idfetch()}
                        <Rate idBlog={this.props.match.params.id} />
                        <ListComment comment={this.state.comment} getID={this.getID} />
                        <Comment idBlog={this.props.match.params.id} getComment={this.getComment} id={this.state.id} />

                    </div>

                </div>
            </div>
        );
    }
}
export default Detail