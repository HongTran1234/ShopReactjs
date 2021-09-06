import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import API from '../Config/Api';
import config from '../Config/Config';
import Pagination from "react-js-pagination"


function Index2() {

    const [getItem, setItem] = useState('');
    // const [activePage, setActivePage] = useState(1);
    // const [itemsCountPerPage, setItemsCountPerPage] = useState(0);
    // const [totalItemsCount, setTotalItemsCount] = useState(0);

    useEffect(() => {
        API.get('/blog')
            .then(response => {
                // console.log(response.data.blog)
                setItem(response.data.blog)
                // setActivePage(response.data.blog.current_page)
                // setItemsCountPerPage(response.blog.data.per_page)
                // setTotalItemsCount(response.data.blog.total)
            })
            .catch(function (error) {
                console.log(error)
            })
    }, [])

    const handlePageChange = (pageNumber) => {
        API.get('/blog?page=' + pageNumber)
            .then(response => {
                setItem(response.data.blog)
                // setActivePage(response.data.blogcurrent_page)
            })
    }

    function fetchData() {
        if (Object.keys(getItem).length > 0) {
            return getItem.data.map((value, key) => {
                return (
                    <div key={key} className="single-blog-post">
                        <h3>{value.title}</h3>
                        <div className="post-meta">
                            <ul>
                                <li><i className="fa fa-user"></i> Mac Doe</li>
                                <li><i className="fa fa-clock-o"></i> 1:33 pm</li>
                                <li><i className="fa fa-calendar"></i> DEC 5, 2013</li>
                            </ul>
                            <span>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star"></i>
                                <i className="fa fa-star-half-o"></i>
                            </span>
                        </div>
                        <a href="">
                            <img src={config.pathUpload + 'Blog/image/' + value.image} alt="" />
                        </a>
                        <p>{value.description}</p>
                        <Link className="btn btn-primary" to={'/blog/detail/' + value.id}>Read More</Link>

                    </div>
                )
            })
        }
    }
    return (

        <div className="col-sm-9">
            <div className="blog-post-area">
                <h2 className="title text-center">Latest From our Blog</h2>
                {fetchData()}
                <div className="pagination-area">
                    {/* <Pagination
                        activePage={activePage}
                        itemsCountPerPage={itemsCountPerPage}
                        totalItemsCount={totalItemsCount}
                        pageRangeDisplayed={2}
                        onChange={handlePageChange}
                    /> */}
                </div>
            </div>

        </div>
    );
}
export default Index2;