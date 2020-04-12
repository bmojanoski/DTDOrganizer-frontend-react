import React from 'react'
import {NavLink, useHistory} from 'react-router-dom';
import Header from "../Header/Header";

const ResourcesAdd = (props) => {

    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();

        const newResource = {
            "name": e.target.name.value,
            "description": e.target.description.value,
            "resourceType": e.target.resourceType.value,
            "image": e.target.image.value,
            "requests":[]
        };

        props.onNewResourcesAdded(newResource);
        history.push("/resources");

    };

    return (
        <div>
            <Header/>
            <NavLink className={"text-reset"} to={"/resources"}>
                <input type="button" className="btn btn-sm btn-outline-primary"
                       value="Back" name="options" id="option3"/>
            </NavLink>
            <div className="card-body">
                <div className="card-text">
                    <div className="consultations">
                        <form onSubmit={onFormSubmit}>
                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> Name:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"name"} type="text"
                                               className="form-control"
                                               title="name"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> Description:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"description"} type="text"
                                               className="form-control"
                                               title="Description"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> Resource Type:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <select name={"resourceType"} className="form-control">
                                            <option value={"Office"}>Office</option>
                                            <option value={"WorkMaterials"}>WorkMaterials</option>
                                            <option value={"Utilities"}>Utilities</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> Image link:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"image"} type="text"
                                               className="form-control"
                                               title="image"/>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12 text-right">
                                <button type="submit" className="btn btn-primary" title="Save">
                                    <i className="fa fa-fw fa-save"/> Save
                                </button>
                            </div>
                        </form>
                        <hr/>
                    </div>
                </div>
            </div>

        </div>
    )
};

export default ResourcesAdd;