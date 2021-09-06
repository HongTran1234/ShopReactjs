import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Detail_hook from './Detail_hook';

function ListComment_hook(props) {
    const [comment, setComment] = useState([])
    function reply(e) {
        const id = e.target.id
        props.getId(id)
        // console.log("Hhhhhhhhhhh")
    }
    function renderComment() {
        let comment = props.comment
        if (comment.length > 0) {
            return comment.map((object, i) => {
                if (object.id_comment == 0) {
                    return (
                        <>
                            <li className="media" key={i} index={i}>
                                <a className="pull-left" href="#">
                                    <img className="media-object" src={'http://localhost/laravel/public/upload/user/avatar/' + object.image_user} alt="" width="100px" height="100px" />
                                </a>
                                <div className="media-body">
                                    <ul className="sinlge-post-meta">
                                        <li><i className="fa fa-user" />{object.name_user}</li>
                                        <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                        <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                    </ul>
                                    <p>{object.comment}
                                    </p>
                                    <a className="btn btn-primary" onClick={reply} id={object.id}><i className="fa fa-reply" />Reply</a>
                                </div>
                            </li>
                            {comment.map((object2, i) => {
                                if (object2.id_comment == object.id) {
                                    return (
                                        <li className="media second-media" key={i} index={i}>
                                            <a className="pull-left" href="#">
                                                <img className="media-object" src={'http://localhost/laravel/public/upload/user/avatar/' + object2.image_user} alt="" width="100px" height="100px" />
                                            </a>
                                            <div className="media-body">
                                                <ul className="sinlge-post-meta">
                                                    <li><i className="fa fa-user" />{object2.name_user}</li>
                                                    <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                                                    <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                                                </ul>
                                                <p>{object2.comment}
                                                </p>
                                                <a className="btn btn-primary" id={object2.id}><i className="fa fa-reply" />Reply</a>

                                            </div>
                                        </li>
                                    )
                                }
                            })}
                        </>
                    )
                }
            })
        }
    }
    return (
        <div className="response-area">
            <ul className="media-list">
                <h2> RESPONSES</h2>
                {renderComment()}
            </ul>
        </div >
    );
}

export default ListComment_hook;