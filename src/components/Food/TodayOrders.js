import React, {Component} from 'react';
import DTDService from "../../repository/axiosConsultationsRepository";

class TodayOrders extends Component {
    constructor(props) {
        super(props);
    }





    render() {
        return (
            <div className="card mb-4" >
                <div className="card-header bg-header">
                    <span className="h5 font-weight-bolder text-white">Today's orders</span>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">

                        <div className="container">
                            <div className="row  font-weight-bold">
                                <div className="col-3  p-0">Restaurant name</div>
                                <div className="col-3  p-0">Order</div>
                                <div className="col-4  p-0">Description</div>
                                <div className="col-2  p-0">Price</div>
                            </div>
                        </div>

                    </li>

                    <li className="list-group-item">
                        <div className="container">
                            <div className="row">
                                <div className="col-3 p-0">Pizza Morino Skopje</div>
                                <div className="col-3 p-0">Hamburger</div>
                                <div className="col-4 p-0">Without katchup, so majonez, bez paprika i ljuto</div>
                                <div className="col-2 p-0">240 MKD</div>
                            </div>
                        </div>

                    </li>
                </ul>
            </div>
        )
    }


}

export default TodayOrders