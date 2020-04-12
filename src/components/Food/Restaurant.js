import React from 'react';
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'


const Restaurant = (props) => {
    const {restaurant} = props;
    return (
        <Zoom>
            <div className={"shadow"} id={"restaurant-card"}>
                <img src={props.restaurant.image} style={{width: 300 + "px", height: 280 + "px"}} alt={""}/>
                <div className={"font-weight-bold"}>{restaurant.name}</div>
                <span className={"small"}>Price Range: {restaurant.priceRange}</span>
            </div>
        </Zoom>
    )
};

export default Restaurant