import React, {Component} from 'react';
import AuthService from "../../services/auth.service";
import Header from "../Header/Header";
import DTDService from "../../repository/axiosConsultationsRepository";



class Request extends Component {
    constructor(props) {
        super(props);
        debugger;
        this.state = {
            requests: this.props.requestsList,
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
    // handleDeleteRow(requestID){
    //     DTDService.deleteRequest(requestID).then((response) => {
    //             const requestsNew = response.data;
    //
    //             this.setState((prevState) => {
    //                 const newRequestsRef = [...prevState.requests, requestsNew];
    //                 return {
    //                     "requests": newRequestsRef
    //                 }
    //             })
    //         }
    //     )
    // }

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
                                    <th scope="col">Resource</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Done</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.requests.map((request) =>
                                        request.resources.map((resource,index) =>
                                            <tr key={index}>
                                                <th scope="row">{request.id}</th>
                                                <td>

                                                    <span key={index} className={"badge badge-success mr-1"}>
                                                        {resource.name}
                                                    </span>


                                                </td>
                                                <td>{request.user_name}</td>
                                                <td><button className="btn btn-success" onClick={i => this.handleDeleteRow(request.id)}>Done</button></td>
                                            </tr>
                                        )

                                    // <tr key={request.id}>
                                    //     <th scope="row">{request.id}</th>
                                    //     <td>{request.request_name}</td>
                                    //     <td>
                                    //         {
                                    //             request.resources.map((resource,index) =>
                                    //                 <span key={index} className={"badge badge-success mr-1"}>
                                    //                     {resource.name}
                                    //                 </span>
                                    //             )
                                    //         }
                                    //
                                    //     </td>
                                    //     <td>{request.user_name}</td>
                                    //     <td><button className="btn btn-success">Done</button></td>
                                    // </tr>
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

export default Request