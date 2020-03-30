import React from 'react';

import Book from './Book';
import LibraryMenu from "../Menu/Menu";


const BookList = (props) => {

    return (
        <div>

            <LibraryMenu book={"active"}/>

            <div className="container">
                <div className="row justify-content-center">
                    {props.bookList.map((book) =>
                        <div className="col-lg-4 col-md-6 col-sm-6 col-10 mb-3 " key={book.isbn}>
                            <Book
                                key={book.isbn}
                                book={book}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default BookList;