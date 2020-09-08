import React, {Component} from 'react';
import Header from "../Header/Header";
import {NavLink} from "react-router-dom";

class Error404 extends Component {



    render() {
        return (
            <>
                <Header/>
                <div className="error404" style={this.styles}>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-12" style={{marginTop: 35 + "%"}}>
                            <div className={"error404-text mb-3"}>Oops. The page you were looking for doesn't exist.</div>
                            <NavLink
                                to={"/"}
                                style={{textDecoration: "none"}}>
                                <button className={"btn btn-outline-primary btn-sm"}>Take me back to homepage.</button>
                            </NavLink>
                        </div>
                    </div>
                </div>
            </>
        )
    }


}

export default Error404