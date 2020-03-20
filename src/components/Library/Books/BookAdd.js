import React from 'react'
import {useHistory} from 'react-router-dom';

const BookAdd = (props) => {

    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();

        const newBook = {

            "isbn": e.target.isbn.value,
            "title": e.target.title.value,
            "authors": [
                e.target.authors.value,
            ],
            "pages": e.target.pages.value,
            "description": e.target.description.value,
            "publisher": e.target.publisher.value,
            "publishedDate":  e.target.publishedDate.value,
            "rating":  e.target.rating.value,
            "imagePath":  e.target.imagePath.value,
            "Qty":  e.target.Qty.value,
        };

        props.onNewBookAdded(newBook);
        history.push("/library/book");

    }

    return (
        <div>
            <div className="card-body">
                <div className="card-text">
                    <div className="consultations">
                        <form onSubmit={onFormSubmit}>
                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> Isbn:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"isbn"} type="text"
                                               className="form-control"
                                               title="Isbn"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> Title:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"title"} type="text"
                                               className="form-control"
                                               title="Title"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> Authors:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"authors"} type="text"
                                               className="form-control"
                                               title="authors"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> Pages:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"pages"} type="text"
                                               className="form-control"
                                               title="Pages"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                            <div className="col-md-6 font-weight-bold"> Description:</div>
                            <div className="col-md-6">
                                <div className="row">
                                    <input name={"description"} type="text"
                                           className="form-control"
                                           title="description"/>
                                </div>
                            </div>
                        </div>

                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> publisher:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"publisher"} type="text"
                                               className="form-control"
                                               title="publisher"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> publishedDate:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"publishedDate"} type="text"
                                               className="form-control"
                                               title="publishedDate"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> rating:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"rating"} type="text"
                                               className="form-control"
                                               title="rating"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> imagePath:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"imagePath"} type="text"
                                               className="form-control"
                                               title="imagePath"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> Qty:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"Qty"} type="text"
                                               className="form-control"
                                               title="Qty"/>
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

export default BookAdd;