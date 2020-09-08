import React, {Component} from 'react';


class TodayOrders extends Component {
    render() {
        return (
            <div className="card my-4">
                <span className="h5 font-weight-bolder text-color-primary text-left pt-2 pl-3">ALL TODAY'S ORDERS</span>
                <div className="table-responsive">
                    <table className="table table-hover mb-0">
                        <thead>
                        <tr>
                            <th scope="col">No. of order</th>
                            <th scope="col">Restaurant name</th>
                            <th scope="col">Order</th>
                            <th scope="col">Description</th>
                            <th scope="col">Price</th>
                            <th scope="col">Employee</th>
                        </tr>
                        </thead>
                        <tbody>
                        {this.props.orderList.map((order) =>
                            order.map((order, index) =>
                                <tr key={order.id}>
                                    <th scope="row">{index + 1}</th>
                                    <td><span className="badge badge-success">{order.restaurant.name}</span></td>
                                    <td>
                                        {
                                            order.foods.map((food,index) =>
                                                <span key={index}
                                                      className={"badge badge-light"}> {food.name} - {food.price} MKD <br/></span>
                                            )
                                        }
                                    </td>
                                    <td>{order.description}</td>
                                    <td><span className="badge badge-dark">{order.price} MKD</span></td>
                                    <td>{order.employee}</td>
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