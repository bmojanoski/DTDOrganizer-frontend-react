import React from 'react';
import LibraryMenu from '../Menu/Menu'
import Document from "./Document";
import {NavLink} from "react-router-dom";


const DocumentList = (props) => {

    return (
        <div>

            <LibraryMenu document={"active"}/>

            <div className="container">
                <div className="row justify-content-center mb-3">
                    <NavLink className={"text-reset"} to={"/library/add/documents"}>
                        <input type="button" className="btn btn-sm btn-outline-primary"
                               value="Add new document" name="options" id="option3"/>
                    </NavLink>
                </div>
                <div className="row justify-content-center">

                    {props.documentList.map((document) =>
                        <div className="col-6 col-sm-6 col-md-6 col-lg-3 col-xl-3 mb-3 " key={document.id}>

                            <Document
                                key={document.id}
                                document={document}
                            />

                        </div>
                    )}
                </div>
            </div>
        </div>
    );

};

export default DocumentList;