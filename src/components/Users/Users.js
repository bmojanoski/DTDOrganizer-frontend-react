import React, {Component} from 'react';
import AuthService from "../../services/auth.service";
import Header from "../Header/Header";


class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: this.props.usersList,
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

    render() {
        return (
            <>
                <Header/>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                            <table className="table table-hover shadow rounded mt-5">
                                <thead>
                                <tr>
                                    <th scope="col">Id</th>
                                    <th scope="col">Full Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Role</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.users.map((user) =>
                                    <tr key={user.id}>
                                    <th scope="row">{user.id}</th>
                                    <td>{user.fullName}</td>
                                    <td>{user.email}</td>
                                    <td>{user.username}</td>
                                    <td>{user.roles[0].name}</td>
                                    </tr>
                                )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </>
        )
    }


}

export default Users