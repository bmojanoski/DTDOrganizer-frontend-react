import React from 'react';
import '../Courses/courseCard.css'

const Course = (props) => {
    const { course } = props;

    return (
        <a className="text-reset" href={course.link}  target="_blank" rel="noopener noreferrer">
            <div className="movie-card">
                <div className="movie-header course-photo" >
                    <div className="header-icon-container">
                    </div>
                </div>

                <div className="movie-content">
                    <div className="movie-content-header">
                        <h1 className="movie-title text-left">{course.course_name}</h1>
                    </div>
                </div>
            </div>
        </a>
    )

};

export default Course;




