import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import DTDService from "../../repository/axiosConsultationsRepository";

export default function Login(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();
        // window.localStorage.setItem('username',email);
        // window.localStorage.setItem('password',password);
        // DTDService.login();

    }

    return (
        <div>
            <div className="container">
                <div className="row align-content-center justify-content-center">
                    <div className="col-6 mt-5">
                        <div className="Login">
                            <form onSubmit={handleSubmit}>
                                <FormGroup controlId="email" >
                                    <label>Email</label>
                                    <FormControl
                                        autoFocus
                                        type="email"
                                        value={email}
                                        onChange={e => setEmail(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup controlId="password" >
                                    <label>Password</label>
                                    <FormControl
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                        type="password"
                                    />
                                </FormGroup>

                                <Button block  disabled={!validateForm()} type="submit">
                                    Login
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}