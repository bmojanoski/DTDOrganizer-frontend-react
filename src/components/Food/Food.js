import React, {Component} from 'react';
import Header from "../Header/Header";
import Restaurant from "./Restaurant";
import Order from "./Order";
import TodayOrders from "./TodayOrders";
import DTDService from "../../repository/axiosConsultationsRepository";

class Food extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row">

                        {this.props.restaurantList.map((restaurant) =>
                            <div className="col-lg-4 col-md-6 col-sm-6 col-10 my-3 " key={restaurant.id}>
                                <Restaurant
                                    key={restaurant.id}
                                    restaurant={restaurant}
                                />
                            </div>
                        )}

                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-6">
                            <Order restaurantList={this.props.restaurantList}/>
                        </div>
                        <div className="col-6">
                            <TodayOrders orderList={this.props.orderList}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

export default Food