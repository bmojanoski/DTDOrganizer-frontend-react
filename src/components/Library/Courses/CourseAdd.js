import React from 'react'
import {NavLink, useHistory} from 'react-router-dom';
import Header from "../../Header/Header";

const CourseAdd = (props) => {

    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();

        const newCourse = {
            "course_name": e.target.course_name.value,
            "link": e.target.link.value
        };

        props.onNewCourseAdded(newCourse);
        history.push("/library/courses");

    };

    return (
        <div>

            <Header/>
            <div className="container">
                <div className="row mt-5 justify-content-center align-content-center">
                    <div className="col-md-6 col-lg-6 col-sm-12 col-12">
                        <div className="card shadow">
                            <h5 className="card-header bg-secondary text-white font-weight-bold">Add new book</h5>
                            <div className="card-body p-5">
                                <div className="card-text">
                                    <div className="consultations">
                                        <form onSubmit={onFormSubmit}>
                                            <div className="row form-group">
                                                <div className="col-md-6 font-weight-bold"> Course name:</div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <input name={"course_name"} type="text"
                                                               className="form-control"
                                                               title="course_name"/>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="row form-group">
                                                <div className="col-md-6 font-weight-bold"> Link:</div>
                                                <div className="col-md-6">
                                                    <div className="row">
                                                        <input name={"link"} type="text"
                                                               className="form-control"
                                                               title="Link"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3 text-left">
                                                    <NavLink className={"text-reset"} to={"/library/courses"}>
                                                        <button type="button"
                                                                className="btn btn-secondary"
                                                                title="Back">
                                                            <i className="fa fa-angle-left"/> Back
                                                        </button>
                                                    </NavLink>
                                                </div>
                                                <div className="col-md-9 text-right">
                                                <button type="submit" className="btn btn-primary" title="Save">
                                                    <i className="fa fa-fw fa-save"/> Save
                                                </button>
                                            </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
};

export default CourseAdd;