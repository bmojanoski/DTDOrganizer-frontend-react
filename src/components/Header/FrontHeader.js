import React, {Component} from "react";
import {Link, NavLink} from "react-router-dom";
import AuthService from "../../services/auth.service";

class FrontHeader extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);

        this.state = {
            showModeratorBoard: false,
            showAdminBoard: false,
            currentUser: undefined
        };
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        const user = AuthService.getCurrentUser();

        if (user) {
            this.setState({
                currentUser: user,
            });
        }
    }

    logOut() {
        AuthService.logout();
    }

    render() {
        const currentUser = this.state.currentUser;
        return (
            <header>
                <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top">
                    <div className="container-fluid">
                        <Link className="navbar-brand text-primary font-weight-bold ml-4" to={"/"}>
                            <img alt={"logo"} src="https://i.ibb.co/VJRc1mQ/logo-third-01.png" width="190" height="70"
                                 className="d-inline-block align-top mr-3"/>
                        </Link>

                        <button className="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarCollapse"
                                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>

                        <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">

                            <ul className="navbar-nav mt-2 mt-lg-0">
                                {(currentUser) ? (
                                    <>
                                        <li className="nav-item">
                                            <NavLink
                                                className="nav-link mr-3 ml-5 text-prim-active font-weight-bold active"
                                                activeClassName="active" to={"/"}>Homepage</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link mr-3 text-prim font-weight-bold "
                                                     activeClassName="active" to={"/calendar"}>Calendar</NavLink>
                                        </li>
                                        <li className="nav-item ">
                                            <NavLink className="nav-link mr-3  text-prim font-weight-bold "
                                                     activeClassName="active"
                                                     to={"/resources/office"}>Resources</NavLink>
                                        </li>
                                        <li className="nav-item ">
                                            <NavLink className="nav-link mr-3 text-prim font-weight-bold "
                                                     activeClassName="active"
                                                     to={"/library/book"}>Library</NavLink>
                                        </li>
                                        <li className="nav-item ">
                                            <NavLink className="nav-link mr-3 text-prim font-weight-bold"
                                                     activeClassName="active"
                                                     to={"/food"}>Food</NavLink>
                                        </li>
                                        <li className="nav-item ">
                                            <NavLink className="nav-link mr-3 text-prim font-weight-bold"
                                                     activeClassName="active"
                                                     to={"/about"}>About us</NavLink>
                                        </li>

                                        <li className="nav-item ">

                                            <NavLink
                                                className="btn btn-outline-primary mr-3  font-weight-bold"
                                                activeClassName="active"
                                                onClick={this.logOut}
                                                to={"/login"}>LogOut</NavLink>

                                        </li>
                                    </>
                                ) : (
                                    <>

                                        <li className="nav-item ">
                                            <NavLink className="btn btn-outline-primary mr-3 ml-5  font-weight-bold"
                                                     style={{width: 80}}
                                                     activeClassName="active"
                                                     to={"/login"}>Login</NavLink>
                                        </li>

                                        <li className="nav-item ">
                                            <NavLink className="btn btn-primary mr-3 ml-3  font-weight-bold shadow"
                                                     style={{width: 80}}
                                                     activeClassName="active"
                                                     to={"/register"}>Sign Up</NavLink>
                                        </li>
                                    </>
                                )
                                }
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
        );
    };
}


export default FrontHeader;
