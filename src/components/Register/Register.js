import React, {Component} from "react";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            signUpError: '',
            signUpEmail: '',
            signUpPassword: '',
        };

        this.onTextboxChangeSignUpEmail = this.onTextboxChangeSignUpEmail.bind(this);
        this.onTextboxChangeSignUpPassword = this.onTextboxChangeSignUpPassword.bind(this);

        this.onSignUp = this.onSignUp.bind(this);
    }

    onTextboxChangeSignUpEmail(event) {
        this.setState({
            signUpEmail: event.target.value,
        });
    }

    onTextboxChangeSignUpPassword(event) {
        this.setState({
            signUpPassword: event.target.value,
        });
    }

    onSignUp() {
        // Grab state
        const {
            signUpEmail,
            signUpPassword,
        } = this.state;

        this.setState({
            isLoading: true,
        });

        // Post request to backend
        fetch('/api/v1/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authroization': 'Basic ' + btoa(signUpEmail + ":" + signUpPassword)
            }
        }).then(res => res.json())
            .then(json => {
                console.log('json', json);
                if (json.success) {
                    this.setState({
                        signUpError: json.message,
                        signUpEmail: '',
                        signUpPassword: '',
                    });
                } else {
                    this.setState({
                        signUpError: json.message,

                    });
                }
            });
    }


    render() {
        const {
            signUpEmail,
            signUpPassword,
            signUpError,
        } = this.state;

        return (
            <div>

                <p>Sign Up</p>
                <input
                    type="email"
                    placeholder="Email"
                    value={signUpEmail}
                    onChange={this.onTextboxChangeSignUpEmail}
                /><br/>
                <input
                    type="password"
                    placeholder="Password"
                    value={signUpPassword}
                    onChange={this.onTextboxChangeSignUpPassword}
                /><br/>
                <button onClick={this.onSignUp}>Sign Up</button>
            </div>
        )
    }
}

export default Register;
