import React, {Component} from 'react';


class TodayOrders extends Component {
    render() {
        return (
            <div className="card mb-4">
                <div className="card-header bg-header">
                    <span className="h5 font-weight-bolder text-white">Today's orders</span>
                </div>
                <div className="table-responsive">
                    <table className="table table-hover table-light">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Restaurant name</th>
                            <th scope="col">Order</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.orderList.map((order) =>
                            order.map( (order,index) =>
                                <tr key={order.id}>
                                    <th scope="row">{index+1}</th>
                                    <td><span className="badge badge-success">{order.restaurant.name}</span></td>
                                    <td>
                                        {
                                            order.foods.map((food) =>
                                                <span key={food.id} className={"badge badge-light"}> {food.name} - {food.price} MKD <br /></span>
                                            )
                                        }
                                    </td>
                                    <td>{order.description}</td>
                                    <td><span className="badge badge-dark">{order.price} MKD</span></td>
                                </tr>
                            )
                        )}

                        </tbody>
                    </table>
                </div>
            </div>
        )
    }


}

export default TodayOrders