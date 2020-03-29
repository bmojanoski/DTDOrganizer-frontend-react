import React from 'react';

import { NavLink} from "react-router-dom";
import Header from "../../Header/Header";

const LibraryMenu = (props) => {


    return (
        <>
            <Header/>
            <div className="container ">
                <div className="row justify-content-center">
                    <div className="btn-group btn-group-toggle my-3 shadow rounded" data-toggle="buttons">
                        <label className={'btn btn-primary ' + props.book}>
                            <NavLink to={"/library/book"} className={"text-reset"}>
                                <input type="radio" name="options" id="option1"/>Books
                            </NavLink>
                        </label>
                        <label className={'btn btn-primary ' + props.course}>
                            <NavLink className={"text-reset"} to={"/library/courses"}>
                                <input type="radio" name="options" id="option2"/> Courses
                            </NavLink>
                        </label>
                        <label className={'btn btn-primary ' + props.document}>
                            <NavLink className={"text-reset"} to={"/library/documents"}>
                                <input type="radio" name="options" id="option3"/>Other docs
                            </NavLink>
                        </label>
                    </div>
                </div>
            </div>
        </>



    );
};

export default LibraryMenu;
