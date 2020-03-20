import React from 'react'
import { useHistory } from 'react-router-dom';

const DocumentAdd = (props) => {

    const history = useHistory();

    const onFormSubmit = (e) => {
        e.preventDefault();

        const newDocument = {
            "document_name": e.target.document_name.value,
            "link": e.target.link.value
        };

        props.onNewDocumentAdded(newDocument);
        history.push("/library/documents");

    };

    return (
        <div>
            <div className="card-body">
                <div className="card-text">
                    <div className="consultations">
                        <form onSubmit={onFormSubmit}>
                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> Document name:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"document_name"} type="text"
                                               className="form-control"
                                               title="document_name"/>
                                    </div>
                                </div>
                            </div>

                            <div className="row form-group">
                                <div className="col-md-6 font-weight-bold"> Link:</div>
                                <div className="col-md-6">
                                    <div className="row">
                                        <input name={"link"} type="text"
                                               className="form-control"
                                               title="Link"/>
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

export default DocumentAdd;