import React from 'react';
import LibraryMenu from '../Menu/Menu'
import Course from "./Course";


const CourseList = (props) => {

    return (
        <div>

            <LibraryMenu course={"active"}/>

            <div className="container">
                <div className="row justify-content-center">

                    {props.courseList.map((course) =>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 mb-3 " key={course.id}>
                            <Course
                                key={course.id}
                                course={course}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default CourseList;