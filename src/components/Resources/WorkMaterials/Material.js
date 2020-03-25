import React from 'react';
import '../officeCss.css'
const Material = (props) => {
    const { material } = props;

    return (
        <div className="office-card">
            <div className="office-header office-photo" style={ {backgroundImage: "url(" + material.image + ")"}} >
            </div>
            <div className="office-content">
                <div className="office-content-header">
                    <h1 className="office-title text-left">{material.name}</h1>
                </div>
                <div className="office-info">
                    <div className="info-section-office text-left">
                        <label>Description</label>
                        <div>{material.description}</div>
                    </div>
                    <div className="info-section-office text-left">
                        <label>Requests</label>
                        <div className="text-right">{material.requests.length}</div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Material;




