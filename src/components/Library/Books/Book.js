import React from 'react';
import './bookCard.css'
import {Link} from 'react-router-dom'

const Book = (props) => {
    const {book} = props;
    return (
        <Link to={`/library/book/${book.isbn}`}>

        <div className="movie-card">
                <div className="movie-header movie-photo  text-black" style={{backgroundImage: "url(" + book.imagePath + ")"}}>
                </div>

                <div className="movie-content">
                    <div className="movie-content-header">
                        <h1 className="movie-title text-left">{book.title}</h1>
                    </div>
                    <div className="movie-info">
                        <div className="info-section text-black" style={{whiteSpace: "pre-line"}}>
                            <label>Authors</label>

                                {book.authors.map((book,i) =>
                                    <p className={'small m-0'} key={i}>{book}</p>
                                )}

                        </div>

                        <div className="info-section text-right">
                            <label>Rating</label>
                            <span>{book.rating}</span>
                        </div>
                        <div className="info-section text-right">
                            <label>Pages</label>
                            <span>{book.pages}</span>
                        </div>
                        <div className="info-section text-right">
                            <label>Quantity</label>
                            <span>{book.qty}</span>
                        </div>

                    </div>
                </div>

            </div>
        </Link>
    )

};

export default Book;




