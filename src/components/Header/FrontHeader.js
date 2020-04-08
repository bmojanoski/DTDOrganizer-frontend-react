import React from 'react';
import {Link, NavLink} from "react-router-dom";


const FrontHeader = () => {

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-transparent fixed-top  pt-4">
                <div className="container-fluid">
                    <Link className="navbar-brand text-primary font-weight-bold ml-4"  to={"/"}>
                        <img alt={"logo"} src="https://i.ibb.co/Tgncdxr/logo-primary-01.png" width="190" height="70"
                             className="d-inline-block align-top mr-3"/>
                    </Link>

                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarCollapse"
                            aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse justify-content-center" id="navbarCollapse">

                        <ul className="navbar-nav mt-2 mt-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link mr-3 ml-5 text-prim font-weight-bold "
                                         activeClassName="active" to={"/calendar"}>Calendar</NavLink>
                            </li>
                            <li className="nav-item ">
                                <NavLink className="nav-link mr-3  text-prim font-weight-bold " activeClassName="active"
                                         to={"/resources/office"}>Resources</NavLink>
                            </li>
                            <li className="nav-item ">
                                <NavLink className="nav-link mr-3 text-prim font-weight-bold " activeClassName="active"
                                         to={"/library/book"}>Library</NavLink>
                            </li>
                            <li className="nav-item ">
                                <NavLink className="nav-link text-prim font-weight-bold" activeClassName="active"
                                         to={"/food"}>Food</NavLink>
                            </li>

                        </ul>
                    </div>
                    {/* <form className="form-inline mt-2 mt-md-0 ml-3">
                  <Link className="btn btn-outline-info my-2 my-sm-0" to={"/login"}>Login</Link>
              </form> */}

                </div>
            </nav>
        </header>
    );
};


export default FrontHeader;
