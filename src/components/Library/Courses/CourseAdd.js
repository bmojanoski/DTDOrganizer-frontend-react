import React from 'react'
import {useHistory} from 'react-router-dom';

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
            <div className="card-body">
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

                            <div className="col-md-12 text-right">
                                <button type="submit" className="btn btn-primary" title="Зачувај">
                                    <i className="fa fa-fw fa-save"/> Зачувај
                                </button>
                            </div>
                        </form>
                        <hr/>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default CourseAdd;