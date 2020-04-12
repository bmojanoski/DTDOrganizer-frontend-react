import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import DTDService from "../../../repository/axiosConsultationsRepository";
import Header from "../../Header/Header";

class BookDetails extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            isbn: this.props.match.params.isbn
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.fetchData(this.state.isbn);
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    fetchData(isbn) {
        DTDService.fetchBooksById({isbn}).then((response) => {
            const newBook = response.data;
            if (this._isMounted = true) {
                this.setState((prevState) => {
                    const newBookRef = [...prevState.books, newBook];
                    return {
                        "books": newBookRef
                    }
                })
            }
        })
    }

    render() {

        return (
            <div>
                <Header/>{
                this.state.books.map((book) =>
                    <div key={book.isbn}>
                        <div className="container">
                            <div className="row">
                                <div className="col-xl-6 col-md-12 col-sm-12 col-12 mb-4">
                                    <div className="card border-0 my-4 ">
                                        <img alt="" src={book.imagePath}
                                             className="card-img-top  mx-auto pt-2 shadow rounded h-50 w-50"/>
                                    </div>
                                </div>
                                <div className="col-xl-6 col-md-12 col-sm-12 col-12 mb-4 text-left">
                                    <div className="card border-0  text-left">

                                        <div className="card-body p-0 pt-4 text-left">
                                            <div className="card-text h4">{book.title}</div>
                                            <p className="lead mb-2">
                                                {book.publisher}
                                            </p>
                                            <div className="text-left mb-4">
                                                <span className="mb-2">ISBN: {book.isbn}</span>
                                            </div>
                                            <div className="text-left">
                                                <span className=""><i className="fa fa-star "/> {book.rating}</span>
                                                <span className="pl-4"><i className="fa fa-book"/> {book.pages}</span>
                                                <span className="pl-4"><i
                                                    className="fa fa-calendar"/> {book.publishedDate}</span>
                                            </div>

                                            <button className="btn rounded mt-3 btn-primary font-weight-bold"
                                            > Rent this book!
                                            </button>
                                        </div>
                                    </div>
                                    <hr/>
                                    <div className="h4">
                                        Description
                                    </div>
                                    <p className="lead">
                                        {book.description}
                                    </p>
                                    <Link className={"btn rounded mt-3 btn-primary font-weight-bold"} type="button"
                                          to={"/library/book"}>Back</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        )

    }
}
;

export default BookDetails;




