import React from 'react';

import ResourcesMenu from "../Menu/ResourcesMenu";

import Checkbox from "../Office/Checkbox";


import Material from "./Material";
import {NavLink} from "react-router-dom";

import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthService from "../../../services/auth.service";

toast.configure();

class MaterialList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            checkedItems: new Map(),
            checkedIds: [],
            show: false,
            btnAddDisable: true,
            currentUser: undefined
        };
        this.handleChange = this.handleChange.bind(this);
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

    handleChange(e) {
        const item = e.target.name;
        const isChecked = e.target.checked;
        if (isChecked) {
            this.state.checkedIds.push(e.target.id);
        } else {
            this.state.checkedIds.pop(e.target.id);
        }
        this.setState(prevState => ({checkedItems: prevState.checkedItems.set(item, isChecked)}));
        this.state.checkedIds.length === 0 ? this.setState({btnAddDisable: true}) : this.setState({btnAddDisable: false})
    }

    onFormSubmit = (e) => {
        e.preventDefault();
        if (this.state.checkedIds.length > 0) {
            this.notifySuccess();
            const ai = Math.floor((Math.random() * 999999) + 1);
            const name = ai.toString();
            const newRequest = {
                "request_name": name,
                "id": this.state.checkedIds,
                "user_id": this.state.currentUser.id
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
    openAdmin = () => {
        this.setState({show: !this.state.show})
    };

    render() {
        // const currentUserRole = this.state.currentUserRole !== "ROLE_USER";
        return (
            <div>
                <ResourcesMenu wmaterials={"active"}/>
                <div className="container">
                    <div className="row   align-items-center">
                        <div className="col-12 p-0 text-center">
                            <form onSubmit={this.onFormSubmit}>
                                <button type="submit"
                                        className="btn  btn-sm  btn-primary request-alert"
                                        disabled={this.state.btnAddDisable}
                                >Request selected items
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="row justify-content-center">

                        {this.props.wMaterialsList.map((material) =>
                            <div className="col-12 col-sm-6 col-md-6 col-lg-3 col-xl-3 mb-3 " key={material.id}>

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
                    <div className="row justify-content-center align-items-center my-3">
                        <div>Haven't found what you're looking for?</div>
                        <NavLink className={"text-reset ml-2"} to={"/resources/add"}>
                            <input type="button" className="btn btn-sm btn-outline-primary"
                                   value="Add new resources here" name="options" id="option3"/>
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }
}

export default MaterialList;