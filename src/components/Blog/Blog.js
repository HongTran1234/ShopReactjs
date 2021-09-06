import React, { Component } from 'react'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
} from "react-router-dom"
import axios from 'axios';
class Blog extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: []
        }

    }
    componentDidMount() {
        axios.get('http://localhost/laravel/public/api/blog')
            .then(response => {
                this.setState({
                    items: response.data.blog
                })
                console.log(response.data.blog)
            })

            .catch(function (error) {
                console.log(error)

            })
    }
    fetchData() {
        let items = this.state.items
        if (items.data instanceof Array) {
            return items.data.map((object, i) => {
                return (

                    <div key={i} index={i} className="single-blog-post">
                        <h3>{object.title}</h3>
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
                            <img src={'http://localhost/laravel/public/upload/blog/image/' + object.image} alt="" />
                        </a>
                        <p>{object.description}
                        </p>

                        <Link to={`/details/${object.id}`} className="btn btn-primary" >Read More</Link>
                    </div>


                )
            })
        }
    }
    render() {
        return (
            <div>
                <div className="col-sm-9">
                    <div className="blog-post-area">
                        <h2 className="title text-center">Latest From our Blog</h2>
                        {this.fetchData()}
                    </div>
                    <div className="pagination-area">
                        <ul className="pagination">
                            <li><a href className="active">1</a></li>
                            <li><a href>2</a></li>
                            <li><a href>3</a></li>
                            <li><a href><i className="fa fa-angle-double-right" /></a></li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}
export default Blog
