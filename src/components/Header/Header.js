import React, { Component } from 'react';
import { NavLink,Link  } from "react-router-dom";


  class Header extends Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-header  navbar-fixed sticky-top shadow">
          <div className="container">
            <Link className="navbar-brand p-0 m-0"  to={"/"}>
              <img alt={""} src="https://i.ibb.co/n3zR0yq/logo-secondary-01.png"  width="115" height="40" className="d-inline-block align-top mr-3"/>
            </Link>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
              aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>


            <div className="collapse navbar-collapse justify-content-end" id="navbarCollapse">

              <ul className="navbar-nav mt-2 mt-lg-0" >
                <li className="nav-item">
                  <NavLink className="nav-link text-menu-size" activeClassName="active" to={"/calendar"} >Calendar</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link text-menu-size" activeClassName="active" to={"/resources"}>Resources</NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className= "nav-link text-menu-size" activeClassName="active" to={"/library"}>Library</NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className="nav-link text-menu-size" activeClassName="active" to={"/food"}>Food</NavLink>
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
  }
}

export default Header;
