import React, {Component} from 'react';


class TodayOrders extends Component {
    render() {
        return (
            <div className="card mb-4">
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
                    {this.props.orderList.map((order) =>
                        order.map((order) =>
                            <li className="list-group-item" key={order.id}>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-3 p-0">{order.restaurant.name}</div>
                                        <div className="col-3 p-0">{
                                            order.foods.map((food) =>
                                               <span key={food.id} className={"small"}> {food.name} - {food.price} MKD <br /></span>
                                            )
                                        }
                                        </div>
                                        <div className="col-4 p-0">{order.description}</div>
                                        <div className="col-2 p-0">{order.price} MKD</div>
                                    </div>
                                </div>
                            </li>
                        )
                    )}
                </ul>
            </div>
        )
    }


}

export default TodayOrders