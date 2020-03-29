import React from 'react';

import ResourcesMenu from "../Menu/ResourcesMenu";
import Office from "./Office";
import Checkbox from "./Checkbox";

import {NavLink} from "react-router-dom";

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from "../../Header/Header";

toast.configure();

class OfficeList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            checkedItems: new Map(),
            checkedIds: []
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
            this.setState(prevState => ({checkedItems: prevState.checkedItems = new Map()}));
            this.setState(prevState => ({checkedIds: prevState.checkedIds = []}));
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


    render() {
        return (
            <div>
                <ResourcesMenu office={"active"}/>

                <div className="container">
                    <div className="row justify-content-center  align-items-center">
                        <div className="col-3 p-0 text-right">
                            <form onSubmit={this.onFormSubmit}>
                                <button type="submit"
                                        className="btn btn-sm btn-outline-primary request-alert"
                                >Request selected items
                                </button>
                            </form>


                        </div>
                        <div className="col-1 p-0">
                            <span className="text-color-primary font-weight-light">OR</span>
                        </div>
                        <div className="col-3 p-0 text-left">
                            <NavLink className={"text-reset"} to={"/resources/add"}>
                                <input type="button" className="btn btn-sm btn-outline-primary"
                                       value="Add new resources" name="options" id="option3"/>
                            </NavLink>
                        </div>
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
            </div>
        );
    }
}

export default OfficeList;