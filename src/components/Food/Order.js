import React, {Component} from 'react';

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRestaurant: "",
            description: "",
            inputs: {
                food: [""],
                price: [""],
            }
        };
    }

    addRow() {
        this.setState({
            inputs: {
                food: [...this.state.inputs.food, ""],
                price: [...this.state.inputs.price, ""]
            }
        });
    }

    handleChangeFood(e, index) {
        debugger;
        this.state.inputs.food[index] = e.target.value

        //set the changed state...
        this.setState({
            inputs: {
                food: this.state.inputs.food,
                price: this.state.inputs.price,
            }
        })
    }

    handleChangePrice(e, index) {
        this.state.inputs.price[index] = e.target.value

        //set the changed state...
        this.setState({
            inputs: {
                food: this.state.inputs.food,
                price: this.state.inputs.price,
            }
        })
    }

    handleRemove(index) {
        this.state.inputs.food.splice(index, 1);
        this.state.inputs.price.splice(index, 1);

        console.log(this.state.inputs, "$$$");
        this.setState({
            inputs: {
                food: this.state.inputs.food,
                price: this.state.inputs.price,
            }
        })
    }

    handleSubmit(e) {
        console.log(this.state, "####");
        var priceSum = 0;
        this.state.inputs.price.forEach(function (element) { priceSum += element });

        var order= {

        }
    }

    render() {
        return (
            <div className="card mb-4">
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
                                            {this.props.restaurantList.map((restaurant) => <option key={restaurant.id}
                                                                                                   value={restaurant.name}>{restaurant.name}</option>)}
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
                                            {
                                                this.state.inputs.food.map((food, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <input type="text"
                                                                   value={food}
                                                                   className="form-control mb-2"
                                                                   required
                                                                   onChange={(e) => this.handleChangeFood(e, index)}
                                                            />

                                                        </div>
                                                    )
                                                })
                                            }
                                            {/*<input type="text" className="form-control" id="inputFood" required/>*/}
                                        </div>
                                        <div className="form-group col-3  text-left">
                                            <label htmlFor="inputPrice">Price</label>
                                            {
                                                this.state.inputs.price.map((price, index) => {
                                                    return (
                                                        <div key={index}>
                                                            <div className="input-group mb-2">
                                                                <input type="text"
                                                                       value={price}
                                                                       className="form-control"
                                                                       required
                                                                       onChange={(e) => this.handleChangePrice(e, index)}/>

                                                                <div className="input-group-append ml-2">
                                                                        <span className="input-group-text"
                                                                              id="basic-addon2">
                                                                            <a type="button"
                                                                               className="fa fa-times-circle "
                                                                               onClick={() => this.handleRemove(index)}
                                                                            />
                                                                        </span>
                                                                </div>
                                                            </div>
                                                        </div>


                                                    )
                                                })
                                            }
                                            {/*<input type="number" className="form-control" id="inputPrice" required/>*/}
                                        </div>
                                        <
                                            div
                                            className="form-group col-5  text-left">
                                            < label
                                                htmlFor="inputDescription">Description:</label>
                                            <textarea className="form-control"
                                                      rows={3}
                                                      placeholder=""
                                                      value={this.state.description}
                                                      onChange={(e) => this.setState({description: e.target.value})}
                                                      required/>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group col-4  text-left">
                                            <button
                                                className="btn btn-primary"
                                                onClick={(e) => this.addRow(e)}
                                            >Add new food
                                            </button>
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
                                    <button
                                        className="btn btn-lg btn-primary mb-2"
                                        onClick={(e) => this.handleSubmit(e)}
                                    >Place order
                                    </button>
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