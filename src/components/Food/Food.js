import React, {Component} from 'react';
import Header from "../Header/Header";
import Restaurant from "./Restaurant";
import Order from "./Order";
import TodayOrders from "./TodayOrders";
import DTDService from "../../repository/axiosConsultationsRepository";
import Footer from "../Footer/Footer";

class Food extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            orderList: [],
            show: false
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadOrders();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    loadOrders = () => {
        DTDService.fetchOrders().then((response) => {
            const newOrder = response.data;
            if (this._isMounted) {
                this.setState((prevState) => {
                    const newOrderRef = [...prevState.orderList, newOrder];
                    return {
                        "orderList": newOrderRef
                    }
                });
            }
        });
    };

    openAdmin = () => {
        if (this._isMounted) {
            this.setState({show: !this.state.show})
        }
    };

    render() {
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row justify-content-between">

                        {this.props.restaurantList.map((restaurant) =>
                            <div className="col-lg-3 col-md-6 col-sm-12 col-10 my-3 " key={restaurant.id}>
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
                        <div className="col-lg-6 col-md-12 col-sm-12 col-10 col-12">
                            <Order restaurantList={this.props.restaurantList} onNewOrderAdded={this.loadOrders}/>
                        </div>
                        <div className="col-lg-6 col-md-12 col-sm-12 col-10 col-12">
                            <TodayOrders orderList={this.state.orderList}/>
                        </div>
                    </div>
                </div>
                <div className="container-fluid bg-yellow" hidden={!this.state.show}>
                    <div className="row">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-10 col-12">
                            ADMIN PANEL
                        </div>
                    </div>
                </div>
                <Footer openAdmin={this.openAdmin}/>
            </div>
        )
    }


}

export default Food