import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Link,
    useParams
} from 'react-router-dom'
import Comment_hook from './Comment_hook';
import ListComment_hook from './ListComment_hook';
import Rate_hook from './Rate_hook';
function Detail_hook() {
    const [comment, setComment] = useState([])
    const [detail, setDetail] = useState({})
    const [count, setCount] = useState(0)
    const [idBlog, setIdBlog] = useState(useParams())
    const [id, setId] = useState('')

    useEffect(() => {
        axios.get(`http://localhost/laravel/public/api/blog/detail/` + idBlog.id)
            .then(res => {
                setDetail(res.data.data)
                setComment(res.data.data.comment)

            })

    }, [])
    function getComment(data) {
        setComment(comment.concat(data))
    }
    function getId(id) {
        setId(id)
    }
    function Idfetch() {
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
    return (

        <div>
            <div className="col-sm-9">
                <div className="blog-post-area">
                    <h2 className="title text-center">Latest From our Blog</h2>
                    {Idfetch()}
                    {/* <Rate idBlog={this.props.match.params.id} />
                <ListComment comment={this.state.comment} getID={this.getID} /> */}
                    {/* <Comment idBlog={this.props.match.params.id} getComment={this.getComment} id={this.state.id} /> */}
                    <Rate_hook idBlog={idBlog.id} />
                    <ListComment_hook comment={comment} getId={getId} />
                    <Comment_hook idBlog={idBlog.id} getComment={getComment} id={id} />

                </div>

            </div>
        </div>
    );
}

export default Detail_hook;