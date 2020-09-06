import React from 'react';

import Book from './Book';
import LibraryMenu from "../Menu/Menu";
import {NavLink} from "react-router-dom";
import Footer from "../../Footer/Footer";
import AuthService from "../../../services/auth.service";


class BookList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            show: false,
            currentUser: undefined
        }
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
            });

        }
    }

    openAdmin = () => {
        this.setState({show: !this.state.show})
    };
    render() {
        const currentUser = this.state.currentUser;
        return (
            <div>

                <LibraryMenu book={"active"}/>

                <div className="container">
                    <div className="row justify-content-center">
                        {this.props.bookList.map((book) =>
                            <div className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 mb-3 " key={book.isbn}>
                                <Book
                                    key={book.isbn}
                                    book={book}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="container-fluid bg-yellow my-2" hidden={!this.state.show}>
                    <hr/>
                    <div className="row mb-3">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-10 col-12">
                            <span className={"h6"}> ADMIN PANEL</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-10 col-12">
                            <NavLink className={"text-reset"} to={"/library/add/book"}>
                                <input type="button" className="btn btn-sm btn-outline-primary"
                                       value="Add new book" name="options" id="option3"/>
                            </NavLink>
                        </div>
                    </div>
                </div>
                {currentUser &&
                ((currentUser.roles[0]!=="ROLE_USER")  &&
                <Footer openAdmin={this.openAdmin}/>)
                }
            </div>
        );
    }
};

export default BookList;