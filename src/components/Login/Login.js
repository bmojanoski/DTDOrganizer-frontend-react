import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


import AuthService from "../../services/auth.service";
import {NavLink} from "react-router-dom";

const required = value => {
    if (!value) {
        return (
            <div className={"text-danger text-left"}>
                This field is required!
            </div>
        );
    }
};

export default class Login extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            password: "",
            loading: false,
            message: ""
        };
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    componentDidMount() {
        this._isMounted = true
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.username, this.state.password).then(
                () => {
                    this.props.history.push("/");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <>
                <div className="login" style={this.styles}>
                </div>
                <div className="d-md-flex h-md-100 align-items-start">
                    <div className="col-md-7 p-0  h-md-100">
                        <div
                            className="text-white d-md-flex align-items-start h-100 p-5 text-center justify-content-left">
                            <div className={"login-text mt-3"}>Welcome back,<div className={"login-smaller mt-0 pt-0"}>please login to your account.</div></div>

                        </div>
                    </div>
                    <div className="col-md-5 p-0 bg-white h-md-100 loginarea">
                        <div className="d-md-flex align-items-center h-md-100 p-5 justify-content-center">
                            <Form
                                onSubmit={this.handleLogin}
                                ref={c => {
                                    this.form = c;
                                }}
                                className=" rounded p-5"
                                style={{width: 80 + "%"}}>
                                <h3 className="mb-5 text-center text-color-primary">Sign In</h3>
                                {this.state.message && (

                                    <span className="">
                                        {this.state.message}
                                 </span>

                                )}
                                <div className="form-group">
                                    <Input
                                        placeholder="Username"
                                        type="text"
                                        className="form-control form-control-lg text-color-primary border-0 bg-light"
                                        name="username"
                                        value={this.state.username}
                                        onChange={this.onChangeUsername}
                                        validations={[required]}
                                    />
                                </div>
                                <div className="form-group">
                                    <Input
                                        type="password"
                                        placeholder="Password"
                                        className="form-control form-control-lg text-color-primary border-0 bg-light"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChangePassword}
                                        validations={[required]}
                                    />
                                </div>
                                <button
                                    className="btn btn-success btn-round btn-block shadow-sm mt-5"
                                    disabled={this.state.loading}
                                >
                                    {this.state.loading && (
                                        <span className="spinner-border spinner-border-sm"/>
                                    )}
                                    <span>Login</span>
                                </button>
                                <div className=" form-row justify-content-center">
                                    <div className={"text-color-primary mt-3"}>New user?</div>
                                    <NavLink
                                        to={"/register"}
                                        style={{textDecoration: "none"}}>
                                        <div className="text-color-primary mt-3 font-weight-bold"> Create an account.
                                        </div>
                                    </NavLink>
                                </div>


                                <CheckButton
                                    style={{display: "none"}}
                                    ref={c => {
                                        this.checkBtn = c;
                                    }}
                                />
                            </Form>
                        </div>
                    </div>
                </div>

            </>
        );
    }
}
