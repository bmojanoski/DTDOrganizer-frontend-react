import React from 'react';
import '../workmaterials.css'
const Office = (props) => {
    const { office } = props;

    return (
            <div className="office-card">
                <div className="office-header office-photo" style={ {backgroundImage: "url(" + office.image + ")", width:100+"%", height:240}} >
                </div>
                <div className="office-content">
                    <div className="office-content-header">
                        <h1 className="office-title text-left">{office.name}</h1>
                    </div>
                    <div className="office-info">
                        <div className="info-section-office text-left">
                            <label>Description</label>
                            <div>{office.description.substring(0,186)}</div>
                        </div>
                    </div>
                </div>
            </div>
    )
};

export default Office;




