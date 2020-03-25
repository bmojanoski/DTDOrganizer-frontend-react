import React from 'react';
import '../officeCss.css'
const Utility = (props) => {
    const { utility } = props;

    return (
        <div className="office-card">
            <div className="office-header office-photo" style={ {backgroundImage: "url(" + utility.image + ")"}} >
            </div>
            <div className="office-content">
                <div className="office-content-header">
                    <h1 className="office-title text-left">{utility.name}</h1>
                </div>
                <div className="office-info">
                    <div className="info-section-office text-left">
                        <label>Description</label>
                        <div>{utility.description}</div>
                    </div>
                    <div className="info-section-office text-left">
                        <label>Requests</label>
                        <div className="text-right">{utility.requests.length}</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Utility;




