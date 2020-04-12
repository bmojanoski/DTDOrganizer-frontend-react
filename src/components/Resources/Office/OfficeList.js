import React from 'react';

import ResourcesMenu from "../Menu/ResourcesMenu";
import Office from "./Office";
import Checkbox from "./Checkbox";

import {NavLink} from "react-router-dom";

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from "../../Footer/Footer";

toast.configure();

class OfficeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedItems: new Map(),
            checkedIds: [],
            show: false,
            btnAddDisable:true
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        if (isChecked) {
            this.state.checkedIds.push(e.target.id);
        } else {
            this.state.checkedIds.pop(e.target.id);
        }
        this.setState(prevState => ({checkedItems: prevState.checkedItems.set(item, isChecked)}));
        this.state.checkedIds.length === 0 ? this.setState({btnAddDisable: true }) : this.setState({btnAddDisable: false })
    }

    onFormSubmit = (e) => {
        e.preventDefault();

        if (this.state.checkedIds.length > 0) {
            this.notifySuccess();
            const aii = Math.floor((Math.random() * 9999999) + 1);
            let name = aii.toString();
            const newRequest = {
                "request_name": name,
                "id": this.state.checkedIds
            };

            this.props.onNewRequest(newRequest);
            this.setState(prevState => ({
                checkedItems: prevState.checkedItems = new Map(),
                checkedIds: prevState.checkedIds = []
            }));
        } else {
            this.notifyWarning();
        }
    };
    notifySuccess = () => {
        toast.success('✅ Successfully requested items!', {
            position: "bottom-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    };
    notifyWarning = () => {
        toast.error('⚠️ Select at least one item!', {
            position: "bottom-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    };
    openAdmin = () => {
        this.setState({show: !this.state.show})
    };


    render() {
        return (
            <div>
                <ResourcesMenu office={"active"}/>

                <div className="container">
                    <div className="row justify-content-center  align-items-center">

                            <form onSubmit={this.onFormSubmit}>
                                <button type="submit"
                                        className="btn btn-sm btn-primary request-alert"
                                        disabled={this.state.btnAddDisable}
                                >Request selected items
                                </button>
                            </form>

                    </div>
                    <div className="row justify-content-center">

                        {this.props.officeList.map((office) =>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-10 mb-3 " key={office.id}>

                                <div className="mt-3 mb-2">
                                    <Checkbox name={office.name}
                                              id={office.id}
                                              checked={this.state.checkedItems.get(office.name)}
                                              onChange={this.handleChange}/>
                                </div>
                                <Office
                                    key={office.id}
                                    office={office}
                                />
                            </div>
                        )}
                    </div>
                </div>
                <div className="container-fluid bg-yellow my-2" hidden={!this.state.show}>
                    <hr/>
                    <div className="row mb-3">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-10 col-12">
                            <span className={"h6"}> ADMIN PANEL</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-10 col-12">
                            <NavLink className={"text-reset"} to={"/resources/add"}>
                                <input type="button" className="btn btn-sm btn-outline-primary"
                                       value="Add new resources" name="options" id="option3"/>
                            </NavLink>
                        </div>
                    </div>
                </div>
                <Footer openAdmin={this.openAdmin}/>
            </div>
        );
    }
}

export default OfficeList;