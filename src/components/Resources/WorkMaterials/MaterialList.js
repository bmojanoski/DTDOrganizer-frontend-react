import React, {Component} from 'react';

import ResourcesMenu from "../Menu/ResourcesMenu";

import Checkbox from "../Office/Checkbox";

import $ from 'jquery';
import Material from "./Material";
import {NavLink} from "react-router-dom";

class MaterialList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checkedItems: new Map(),
            checkedIds: []
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        $(".alert").hide();
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
        $(".alert").show();
        const ai = Math.floor((Math.random() * 999999) + 1);
        var name = ai.toString();
        const newRequest = {
            "request_name": name,
            "id": this.state.checkedIds
        };


        this.props.onNewRequest(newRequest);
        this.setState(prevState => ({checkedItems: prevState.checkedItems = new Map()}));
        this.setState(prevState => ({checkedIds: prevState.checkedIds = []}));

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
                                        data-toggle="modal"
                                        data-target="#exampleModalCenter">Request selected items
                                </button>
                            </form>

                            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog"
                                 aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                <div className="modal-dialog modal-dialog-centered" role="document">
                                    <div className="modal-content">
                                        <div className="modal-header">
                                            <h5 className="modal-title text-success" id="exampleModalLongTitle">
                                                <b>Hooray!</b></h5>
                                            <button type="button" className="close" data-dismiss="modal"
                                                    aria-label="Close">
                                                <span aria-hidden="true">&times;</span>
                                            </button>
                                        </div>
                                        <div className="modal-body">
                                            Your request is successfully submitted!
                                        </div>

                                    </div>
                                </div>
                            </div>
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