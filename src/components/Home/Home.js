import React, {Component} from 'react';
import FrontHeader from "../Header/FrontHeader";
import {init} from 'ityped';
import {NavLink,Link} from "react-router-dom";
import AuthService from "../../services/auth.service";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: undefined,
            username: ""
        };
    }

    componentDidMount() {
        const myElement = document.querySelector('#ityped')
        init(myElement, {
            showCursor: true,
            cursorChar: "|",
            strings: ['All your favourite things. All in one place.'],
            typeSpeed: 150,
            backSpeed: 100,
            backDelay: 2500
        })

        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
            });
        }
    }
    onChangeUsername = (e) => {
        this.setState({
            username: e.target.value
        });
    }
    render() {
        const currentUser = this.state.currentUser;
        return (
            <>
                <FrontHeader/>
                <div className="intro" style={this.styles}>
                </div>
                <div className="container">
                    <div className="row">
                        <div>
                            <h1 className="text" id="ityped"> </h1>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        {(currentUser) ? (
                            <>
                                <div className="col-3" style={{marginTop: 34 + "%"}}>
                                    <NavLink
                                        to={"/calendar"}
                                        style={{textDecoration: "none"}}>
                                        <div className="card1" style={{width: 180, height: 170}}>
                                            <p><img className=" img-fluid mt-2"
                                                    style={{width: 115, height: 115}}
                                                    src="https://i.ibb.co/7bMjvZV/calendar-01.png"
                                                    alt={"calendar"}/>
                                            </p>
                                            <h5 className="card-title">Calendar</h5>
                                            <div className="go-corner">
                                                <div className="go-arrow">
                                                    →
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="col-3" style={{marginTop: 34 + "%"}}>
                                    <NavLink
                                        to={"/resources/office"}
                                        style={{textDecoration: "none"}}>
                                        <div className="card1" style={{width: 180, height: 170}}>
                                            <p><img className=" img-fluid mt-2"
                                                    style={{width: 115, height: 115}}
                                                    src="https://i.ibb.co/Pr8crBY/resources-01.png"
                                                    alt={"resources"}/>
                                            </p>
                                            <h5 className="card-title">Resources</h5>
                                            <div className="go-corner">
                                                <div className="go-arrow">
                                                    →
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="col-3" style={{marginTop: 34 + "%"}}>
                                    <NavLink
                                        to={"/library"}
                                        style={{textDecoration: "none"}}>
                                        <div className="card1" style={{width: 180, height: 170}}>
                                            <p><img className=" img-fluid mt-2"
                                                    style={{width: 115, height: 115}}
                                                    src="https://i.ibb.co/9g656kD/library-01.png"
                                                    alt={"library"}
                                            />
                                            </p>
                                            <h5 className="card-title">Library</h5>
                                            <div className="go-corner">
                                                <div className="go-arrow">
                                                    →
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                                <div className="col-3" style={{marginTop: 34 + "%"}}>
                                    <NavLink
                                        to={"/food"}
                                        style={{textDecoration: "none"}}>
                                        <div className="card1" style={{width: 180, height: 170}}>
                                            <p><img className=" img-fluid mt-2"
                                                    style={{width: 115, height: 115}}
                                                    src="https://i.ibb.co/RBtL2kf/food-design-01.png"
                                                    alt={"food"}
                                            />
                                            </p>
                                            <h5 className="card-title">Food</h5>
                                            <div className="go-corner">
                                                <div className="go-arrow">
                                                    →
                                                </div>
                                            </div>
                                        </div>
                                    </NavLink>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="col-12" style={{marginTop: 36 + "%"}}>
                                    <div className={"text-color-primary"} style={{fontSize:30+'px'}}>
                                        START <span className={"font-weight-bold"}>ORGANIZING</span> YOUR COMPANY
                                    </div>
                                    <div className={"text-color-primary mb-4"} style={{fontSize:18+'px'}}>
                                        Learn more
                                            <Link style={{textDecoration:"none"}}
                                                  className={"text-color-primary"}
                                                to={"/about"}> About us</Link>

                                    </div>

                                    <div className="row justify-content-center">
                                        <NavLink to={{
                                            pathname: '/register',
                                            state: {
                                                fromNotifications: true
                                            }}}
                                            style={{textDecoration: "none"}}
                                            className={"col-md-3 text-center"}>
                                            <button className={"btn btn-primary btn-lg shadow"}>Get started for free</button>
                                        </NavLink>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </>
        )
    }
}

export default Home