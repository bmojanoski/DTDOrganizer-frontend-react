import React from 'react';
import '../officeCss.css'
const Office = (props) => {
    const { office } = props;

    return (
            <div className="office-card">
                <div className="office-header office-photo" style={ {backgroundImage: "url(" + office.image + ")"}} >
                </div>
                <div className="office-content">
                    <div className="office-content-header">
                        <h1 className="office-title text-left">{office.name}</h1>
                    </div>
                    <div className="office-info">
                        <div className="info-section-office text-left">
                            <label>Description</label>
                            <div>{office.description}</div>
                        </div>
                    </div>
                </div>
            </div>
    )
};

export default Office;




