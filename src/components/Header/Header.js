import React, { Component } from 'react';
import { NavLink  } from "react-router-dom";


class Header extends Component {
  render() {
    return (
      <header>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary  navbar-fixed sticky-top shadow">
          <div className="container">
            <a className="navbar-brand" href="/calendar">
              <img alt={""} src="../logo-without-name.png"  width="30" height="30" className="d-inline-block align-top mr-3"/>
              Day to Day Organizer</a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
              aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"/>
            </button>


            <div className="collapse navbar-collapse " id="navbarCollapse">

              <ul className="navbar-nav mr-auto mt-2 mt-lg-0" >
                <li className="nav-item">
                  <NavLink className="nav-link" activeClassName="active" to={"/calendar"} >Calendar</NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className="nav-link" activeClassName="active" to={"/resources"}>Resources</NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className={"nav-link"} activeClassName="active" to={"/library/"}>Library</NavLink>
                </li>
                <li className="nav-item ">
                  <NavLink className={"nav-link"} activeClassName="active" to={"/food"}>Food</NavLink>
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
