import React from 'react';
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Zoom from "react-medium-image-zoom";

const RestaurantCarousel = (props) => (

    <Carousel  arrows slidesPerPage={3}  fastSwipe
    >

        {props.restaurant.map((restaurant) =>

            <div key={restaurant.id}>
                <Zoom>
                    <div className={"shadow my-3 bg-light rounded"} id={"restaurant-card"}>
                        <img src={restaurant.image} style={{width: 220 + "px", height: 200 + "px"}} alt={""}/>
                        <div className={"font-weight-bold"}>{restaurant.name}</div>
                        <span className={"small"}>Price Range: {restaurant.priceRange}</span>
                    </div>
                </Zoom>
            </div>
        )}

    </Carousel>
);

export default RestaurantCarousel;