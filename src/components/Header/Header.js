import React, { Component } from 'react';
import { NavLink,Link  } from "react-router-dom";
import AuthService from "../../services/auth.service";


  class Header extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentUser: undefined
      };
    }

    componentDidMount() {
      const user = AuthService.getCurrentUser();
      if (user) {
        this.setState({
          currentUser: user,
            currentUserRole : user.roles[0]
        });
      }
    }
    logOut() {
      AuthService.logout();
    }

  render() {
    const currentUser = this.state.currentUser;
    const currentUserRole = this.state.currentUserRole === "ROLE_ADMIN";
    return (
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
                  <NavLink className="nav-link text-menu-size" activeClassName="active" exact to={"/"} >Home</NavLink>
                </li>
                {(currentUser) &&
                <li className="nav-item">
                  <NavLink className="nav-link text-menu-size" activeClassName="active"
                           to={"/calendar"}>Calendar</NavLink>
                </li>
                }

                {(currentUser) &&
                <li className="nav-item">
                  <NavLink className="nav-link text-menu-size" activeClassName="active"
                           to={"/resources"}>Resources</NavLink>
                </li>
                }
                {(currentUser) &&
                <li className="nav-item ">
                  <NavLink className="nav-link text-menu-size" activeClassName="active"
                           to={"/library"}>Library</NavLink>
                </li>
                }
                {(currentUser) &&
                <li className="nav-item ">
                  <NavLink className="nav-link text-menu-size" activeClassName="active" to={"/food"}>Food</NavLink>
                </li>
                }
                {(currentUserRole) &&
                <li className="nav-item ">
                  <NavLink className="nav-link text-menu-size" activeClassName="active" to={"/users"}>Users</NavLink>
                </li>
                }
                {(currentUserRole) &&
                <li className="nav-item ">
                  <NavLink className="nav-link text-menu-size" activeClassName="active" to={"/requests"}>Requests</NavLink>
                </li>
                }
                <li className="nav-item ">
                  <NavLink className="nav-link text-menu-size" activeClassName="active" to={"/about"}>About us</NavLink>
                </li>
                {(currentUser) &&
                <li className="nav-item ">
                  <NavLink className="nav-link text-menu-size btn btn-outline-secondary"
                           activeClassName="active"
                           onClick={this.logOut}
                           to={"/login"}>
                    Log out
                  </NavLink>
                </li>
                }
                {(!currentUser) &&
                <li className="nav-item ">
                  <NavLink className="nav-link text-menu-size btn btn-outline-secondary"
                           activeClassName="active"
                           to={"/login"}>
                    Log in
                  </NavLink>
                </li>
                }
              </ul>
            </div>
          </div>
        </nav>
    );
  }
}

export default Header;
