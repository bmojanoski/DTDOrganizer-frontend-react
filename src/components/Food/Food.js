import React, {Component} from 'react';
import Header from "../Header/Header";
import Restaurant from "./Restaurant";
import Order from "./Order";
import TodayOrders from "./TodayOrders";
import DTDService from "../../repository/axiosConsultationsRepository";
import Book from "../Library/Books/Book";

class Food extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restaurantList: []

        }
    }

    componentDidMount() {
        this.loadRestaurants();
    }

    //BOOKS
    loadRestaurants = () => {
        DTDService.fetchRestaurants().then((response) => {
            this.setState({
                restaurantList: response.data
            });
        });
    };


    render() {

        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row">

                            {this.state.restaurantList.map((restaurant) =>
                                <div className="col-lg-4 col-md-6 col-sm-6 col-10 my-3 " key={restaurant.id}>
                                    <Restaurant
                                        key={restaurant.id}
                                        restaurant={restaurant}
                                    />
                                </div>
                            )}

                    </div>
                    <div className="row">
                        <div className="col-6">
                            <Order/>
                        </div>
                        <div className="col-6">
                            <TodayOrders/>
                        </div>
                    </div>

                </div>
            </div>
        )
    }


}

export default Food