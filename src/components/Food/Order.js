import React, {Component} from 'react';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRestaurant: ""
        };
    }

    render() {
        return (
            <div className="card mb-4" >
                <div className="card-header bg-header">
                    <span className="h5 font-weight-bolder text-white">Make an order</span>
                </div>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">

                        <div className="container">
                            <div className="row pb-3"><span className="h5">Step 1: Pick a restaurant </span></div>
                            <div className="row align-items-center">
                                <div className="col-12">
                                    <div className="form-group">
                                        <select value={this.state.selectedRestaurant}
                                                onChange={(e) => this.setState({selectedRestaurant: e.target.value})}
                                                className="form-control"
                                        >
                                            <option defaultValue="">Choose restaurant for your order</option>
                                            {this.props.restaurantList.map((restaurant) => <option key={restaurant.id} value={restaurant.name}>{restaurant.name}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </li>
                    <li className="list-group-item">

                        <div className="container">
                            <div className="row pb-3"><span className="h5">Step 2: Write your order</span></div>
                            <div className="row justify-content-start ">
                                <div className="col-12">
                                    <div className="form-row">
                                        <div className="form-group col-4  text-left">
                                            <label htmlFor="inputFood">Food name:</label>
                                            <input type="text" className="form-control" id="inputFood" required/>
                                        </div>
                                        <div className="form-group col-6  text-left">
                                            <label htmlFor="inputDescription">Description:</label>
                                            <textarea className="form-control" id="inputDescription"
                                                      rows={1}
                                                      placeholder="" required/>
                                        </div>
                                        <div className="form-group col-2  text-left">
                                            <label htmlFor="inputPrice">Price</label>
                                            <input type="number" className="form-control" id="inputPrice" required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </li>
                    <li className="list-group-item">

                        <div className="container">
                            <div className="row pb-3"><span className="h5">Step 3: Place your order</span></div>
                            <div className="row justify-content-start ">
                                <div className="col-12">
                                    <button type="submit" className="btn btn-lg btn-primary mb-2">Place order</button>
                                </div>
                            </div>
                        </div>

                    </li>
                </ul>
            </div>
        )
    }


}

export default Order