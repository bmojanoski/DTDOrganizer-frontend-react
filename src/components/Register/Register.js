import React, {Component} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {isEmail} from "validator";

import AuthService from "../../services/auth.service";
import {NavLink} from "react-router-dom";


const required = value => {
    if (!value) {
        return (
            <div className="text-danger text-left">
                This field is required!
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="text-danger text-left">
                This is not a valid email.
            </div>
        );
    }
};

const vusername = value => {
    if (value.length < 3 || value.length > 20) {
        return (
            <div className="text-danger text-left">
                The username must be between 3 and 20 characters.
            </div>
        );
    }
};

const vfullName = value => {
    if (value.length < 5 || value.length > 30) {
        return (
            <div className="text-danger text-left">
                The username must be between 5 and 30 characters.
            </div>
        );
    }
};

const vpassword = value => {
    if (value.length < 6 || value.length > 40) {
        return (
            <div className="text-danger text-left">
                The password must be between 6 and 40 characters.
            </div>
        );
    }
};

class Register extends Component {
    constructor(props) {

        super(props);
        this.handleRegister = this.handleRegister.bind(this);
        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangefullName = this.onChangefullName.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            username: "",
            fullName:"",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }
    onChangefullName(e) {
        this.setState({
            fullName: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.username,
                this.state.fullName,
                this.state.email,
                this.state.password
            ).then(
                response => {
                    this.setState({
                        successful: true,
                        message: response.data.message,
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        return (
            <>
                <div className="register-back" style={this.styles}>
                </div>
                <div className="d-md-flex h-md-100 align-items-center">
                    <div className="col-md-7 p-0  h-md-100">
                        <div
                            className="text-white d-md-flex align-items-start h-100 p-5 text-center justify-content-left">
                            <div className={"login-text mt-3"}>Hello friend,<div className={"login-smaller mt-0 pt-0"}>enter your personal details and start journey with us</div></div>

                        </div>
                    </div>
                    <div className="col-md-5 p-0 bg-white h-md-100 loginarea">
                        <div className="d-md-flex align-items-center h-md-100 p-5 justify-content-center">
                            <Form
                                onSubmit={this.handleRegister}
                                ref={c => {
                                    this.form = c;
                                }}
                                style={{width: 80 + "%"}} className="border-0 rounded p-5">
                                <h3 className="mb-5 text-center">Register</h3>
                                {this.state.message && (
                                    <div className="form-group">
                                        <div
                                            className={
                                                this.state.successful
                                                    ? "text-success"
                                                    : "text-danger"
                                            }
                                            role="alert"
                                        >
                                            {this.state.message}
                                        </div>
                                    </div>
                                )}
                                {!this.state.successful && (
                                    <div>

                                        <div className="form-group">
                                            <Input
                                                type="text"
                                                placeholder="Username"
                                                className="form-control form-control-lg text-color-primary border-0 bg-light"
                                                name="username"
                                                value={this.state.username}
                                                onChange={this.onChangeUsername}
                                                validations={[required, vusername]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <Input
                                                type="text"
                                                placeholder="Full Name"
                                                className="form-control form-control-lg text-color-primary border-0 bg-light"
                                                name="fullName"
                                                value={this.state.fullName}
                                                onChange={this.onChangefullName}
                                                validations={[required, vfullName]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <Input
                                                type="text"
                                                className="form-control form-control-lg text-color-primary border-0 bg-light"
                                                name="email"
                                                placeholder="Email"
                                                value={this.state.email}
                                                onChange={this.onChangeEmail}
                                                validations={[required, email]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <Input
                                                type="password"
                                                className="form-control form-control-lg text-color-primary border-0 bg-light"
                                                name="password"
                                                placeholder="Password"
                                                value={this.state.password}
                                                onChange={this.onChangePassword}
                                                validations={[required, vpassword]}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <button className="btn btn-success btn-round btn-block shadow-sm mt-5">Sign Up
                                            </button>
                                        </div>

                                    </div>
                                )}
                                <div className=" form-row justify-content-center">
                                    <div className={"text-color-primary mt-3"}>Already user?</div>
                                    <NavLink
                                        to={"/login"}
                                        style={{textDecoration: "none"}}>
                                        <div className="text-color-primary mt-3 font-weight-bold"> Sign in here.
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

export default Register