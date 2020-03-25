import React, {useEffect, useState} from 'react';
import {useParams,  Link} from 'react-router-dom';
import DTDService from "../../../repository/axiosConsultationsRepository";

const BookDetails = (props) => {
    const [books, setBook] = useState({});

    const {isbn} = useParams();

    function fetchData () {
        DTDService.fetchBooksById({isbn}).then((response) => {
            const books = response.data;
            const currBook = {
                ...books,
            };
            setBook(currBook);
        })
    }
    useEffect(() => {
        fetchData()
    }, [fetchData]);

    return (
        <div className="container">
            <div className="row">
                <div className="col-xl-6 col-md-12 col-sm-12 col-12 mb-4">
                    <div className="card border-0 my-4 ">
                        <img alt="" src={books.imagePath} className="card-img-top  mx-auto pt-2 shadow rounded h-50 w-50"/>
                    </div>
                </div>
                <div className="col-xl-6 col-md-12 col-sm-12 col-12 mb-4 text-left">
                    <div className="card border-0  text-left">

                        <div className="card-body p-0 pt-4 text-left">
                            <div className="card-text h4">{books.title}</div>
                            <p className="lead">
                                {books.publisher}
                            </p>
                            <div className="text-left">
                                <span className=""><i className="fa fa-star "/> {books.rating}</span>
                                <span className="pl-4"><i className="fa fa-book"/> {books.pages}</span>
                                <span className="pl-4"><i className="fa fa-calendar"/> {books.publishedDate}</span>
                            </div>

                            <button  className="btn  rounded mt-3 bg-primary font-weight-bold"
                                    > Rent this book!
                            </button>
                        </div>
                    </div>
                    <hr/>
                    <div className="h4">
                        Description
                    </div>
                    <p className="lead">
                        {books.description}
                    </p>
                    <Link className={"btn btn-white"} type="button" to={"/library/book"}>Back</Link>
                </div>
            </div>
        </div>
    )

};

export default BookDetails;




