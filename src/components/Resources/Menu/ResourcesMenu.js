import React from 'react';

import { NavLink} from "react-router-dom";

const ResourcesMenu = (props) => {
    return (

        <div className="btn-group btn-group-toggle my-3 shadow rounded" data-toggle="buttons">
            <label className={'btn btn-primary ' + props.office}>
                <NavLink to={"/resources/office"} className={"text-reset"}>
                    <input type="radio" name="options" id="option1"/>Office
                </NavLink>
            </label>
            <label className={'btn btn-primary ' + props.utilities}>
                <NavLink className={"text-reset"} to={"/resources/utilities"}>
                    <input type="radio" name="options" id="option2"/> Utilities
                </NavLink>
            </label>
            <label className={'btn btn-primary ' + props.wmaterials}>
                <NavLink className={"text-reset"} to={"/resources/materials"}>
                    <input type="radio" name="options" id="option3"/>Work Materials
                </NavLink>
            </label>
        </div>

    );
};

export default ResourcesMenu;
