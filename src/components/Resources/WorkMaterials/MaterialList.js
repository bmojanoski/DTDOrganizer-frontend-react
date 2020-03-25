import React from 'react';

import ResourcesMenu from "../Menu/ResourcesMenu";

import Checkbox from "../Office/Checkbox";


import Material from "./Material";
import {NavLink} from "react-router-dom";

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

toast.configure();
class MaterialList extends React.Component {

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
        const ai = Math.floor((Math.random() * 999999) + 1);
        var name = ai.toString();
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
                <div className="container ">
                    <div className="row justify-content-center">
                        <ResourcesMenu wmaterials={"active"}/>
                    </div>
                </div>
                <div className="container">
                    <div className="row justify-content-center  align-items-center">
                        <div className="col-3 p-0 text-right">
                            <form onSubmit={this.onFormSubmit}>
                                <button type="submit"
                                        className="btn  btn-sm  btn-outline-primary request-alert"
                                        >Request selected items
                                </button>
                            </form>
                        </div>
                        <div className="col-1 p-0">
                            <span className="font-weight-light text-primary">OR</span>
                        </div>
                        <div className="col-3 p-0 text-left">
                            <NavLink className={"text-reset"} to={"/resources/add"}>
                                <input type="button"
                                       className="btn  btn-sm  btn-outline-primary"
                                       value="Add new resources"
                                       name="options"
                                       id="option3"/>
                            </NavLink>
                        </div>
                    </div>
                    <div className="row justify-content-center">

                        {this.props.wMaterialsList.map((material) =>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-10 mb-3 " key={material.id}>

                                <div className="mt-3 mb-2">
                                    <Checkbox name={material.name}
                                              id={material.id}
                                              checked={this.state.checkedItems.get(material.name)}
                                              onChange={this.handleChange}/>
                                </div>
                                <Material
                                    key={material.id}
                                    material={material}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default MaterialList;