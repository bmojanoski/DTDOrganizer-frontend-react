import React, {Component} from 'react';

const Restaurant = (props) => {
    const {restaurant} = props;
    debugger;
    return (
        <div>

            <div className="movie-card ">
                <div className="movie-header movie-photo img-enlargable"
                     data-enlargable
                     style={{backgroundImage: "url(" + restaurant.image + ")", cursor: "zoom-in"}}>
                </div>
                <div className="movie-content">
                    <div className="movie-content-header">
                        <h1 className="movie-title text-left">{restaurant.name}</h1>
                    </div>
                    <div className="movie-info">
                        <div className="info-section text-right">
                            <label>Price Range</label>
                            <span>{restaurant.priceRange}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Restaurant