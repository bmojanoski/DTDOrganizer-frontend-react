import React, {Component} from 'react';
import DTDService from "../../repository/axiosConsultationsRepository";
import {toast} from 'react-toastify'
import AuthService from "../../services/auth.service";

toast.configure();

class Order extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedRestaurant: "",
            selectedRestaurantForFood: "",
            selectedFood: "",
            description: "",
            inputs: {
                food: [""],
                price: [""]
            },
            currentUser: undefined,
            restaurantList: this.props.restaurantList,
            totalPrice: 0
        };
    }

    componentDidMount() {
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
            });
        }
    }

    validateForm() {
        return this.state.selectedRestaurant.length > 0
            && this.state.inputs.food[0].length > 1
            && this.state.inputs.price[0].length > 1
            && this.state.description.length < 255;
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

        this.state.inputs.food[index] = e.target.value;

        //set the changed state...
        this.setState({
            inputs: {
                food: this.state.inputs.food,
                price: this.state.inputs.price,
            }
        })
    }

    handleChangePrice(e, index) {
        this.state.inputs.price[index] = e.target.value;

        //set the changed state...
        this.setState({
            inputs: {
                food: this.state.inputs.food,
                price: this.state.inputs.price,
            }
        })
    }

    handleSelectRestaurant = (e) => {
        this.setState({
            selectedRestaurant: e.target.value,
        });

    };
    resetTotalPrice = (e) => {
        this.setState({
            totalPrice: 0,
        });

    };

    handleRemove(index) {
        this.state.inputs.food.splice(index, 1);
        this.state.inputs.price.splice(index, 1);

        this.setState({
            inputs: {
                food: this.state.inputs.food,
                price: this.state.inputs.price,
            }
        })
    }

    notifySuccess = () => {
        toast.success('✅ Successfully ordered items!', {
            position: "bottom-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    };
    notifyWarning = () => {
        toast.error('⚠️ Don\' leave empty fields!', {
            position: "bottom-center",
            autoClose: 3000,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
        });
    };

    handleSubmit(e) {
        e.preventDefault();
        var priceSum = 0;
        this.state.inputs.price.forEach(function (element) {
            priceSum += parseInt(element)
        });

        const food = [];
        for (var i = 0; i < this.state.inputs.food.length; i++) {
            if (this.state.inputs.food[i].length > 0 && this.state.inputs.price[i].length > 0) {
                food.push({
                    name: this.state.inputs.food[i],
                    price: this.state.inputs.price[i]
                });
            } else {
                this.notifyWarning();
                return 0;
            }
        }


        const d = new Date();
        const date = d.toISOString().split("T", 1)[0];

        const order = {
            "price": priceSum,
            "description": this.state.description,
            "date": date,
            "restaurant":
                {
                    "name": this.state.selectedRestaurant
                },
            "foods": [
                ...food
            ],
            "employee": this.state.currentUser.fullName
        };

        DTDService.postOrder(order).then((response) => {
            if (response.status === 200) {
                this.notifySuccess();
                this.props.onNewOrderAdded(order);
                this.setState({
                    totalPrice: priceSum.toString(),
                    selectedRestaurant: "",
                    selectedRestaurantForFood: "",
                    selectedFood: "",
                    description: "",
                    inputs: {
                        food: [""],
                        price: [""]
                    }
                })
            }
        });

    }

    render() {
        return (
            <>
                <div className="row">
                    <div className="col-8 col-sm-8 col-md-8 col-lg-8 col-xl-8">
                        <div className="card my-4">
                            <ul className="list-group list-group-flush">
                            <span
                                className="h5 font-weight-bolder text-color-primary text-left pt-2 pl-3">MAKE AN ORDER</span>
                                <li className="list-group-item">
                                    <div className="container">
                                        <div className="row pb-3"><span className="h6 font-weight-bold">Step 1: Pick a restaurant </span>
                                        </div>
                                        <div className="row align-items-center">
                                            <div className="col-12">
                                                <div className="form-group">
                                                    <select value={this.state.selectedRestaurant}
                                                            onChange={(e) => this.handleSelectRestaurant(e)}
                                                            className="form-control"
                                                    >
                                                        <option>*Choose restaurant for your order</option>
                                                        {this.state.restaurantList.map((restaurant) =>
                                                            <option key={restaurant.id}
                                                                    value={restaurant.name}>{restaurant.name}</option>
                                                        )}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                <li className="list-group-item">

                                    <div className="container">
                                        <div className="row pb-3"><span className="h6 font-weight-bold">Step 2: Write your order</span>
                                        </div>
                                        <div className="row justify-content-start ">
                                            <div className="col-12">
                                                <div className="form-row">
                                                    <div
                                                        className="form-group col-6 col-sm-6 col-md-5 col-lg-5 col-xl-5  text-left">
                                                        <label htmlFor="inputFood">*Food name:</label>
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
                                                    </div>
                                                    <div
                                                        className="form-group col-6 col-sm-6 col-md-5 col-lg-5 col-xl-5 text-left">
                                                        <label htmlFor="inputPrice">*Price</label>
                                                        {
                                                            this.state.inputs.price.map((price, index) => {
                                                                return (
                                                                    <div key={index}>
                                                                        <div className="input-group mb-2">
                                                                            <input type="number"
                                                                                   value={price}
                                                                                   className="form-control"
                                                                                   required
                                                                                   onChange={(e) => this.handleChangePrice(e, index)}/>

                                                                            <div className="input-group-append ml-2">
                                                                            <span className="input-group-text"
                                                                                  id="basic-addon2">
                                                                            <span type="button"
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

                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div
                                                        className="form-group col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6  text-left">
                                                        <label
                                                            htmlFor="inputDescription">Description:</label>
                                                        <textarea className="form-control"
                                                                  rows={1}
                                                                  placeholder=""
                                                                  value={this.state.description}
                                                                  onChange={(e) => this.setState({description: e.target.value})}
                                                                  required/>
                                                    </div>
                                                </div>
                                                <div className="form-row">
                                                    <div className="form-group col-12  text-left">
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
                                        <div className="row pb-3"><span className="h6 font-weight-bold">Step 3: Place your order</span>
                                        </div>
                                        <div className="row justify-content-start ">
                                            <div className="col-12">
                                                <button
                                                    className="btn btn-lg btn-primary mb-2"
                                                    disabled={!this.validateForm()}
                                                    onClick={(e) => this.handleSubmit(e)}
                                                >Place order
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </li>
                            </ul>
                        </div>
                    </div>
                    {(this.state.totalPrice > 0) &&
                    <>
                        <div className="col-4 col-sm-4 col-md-4 col-lg-4 col-xl-4">
                            <div className="card my-4 ">
                                <ul className="list-group list-group-flush ">

                                    <li className="list-group-item bg-secondary">
                                        <div className="container">
                                            <div className="row ">
                                                <div
                                                    className=" h4 font-weight-bolder text-white text-left pt-2 pl-3">You
                                                    have to pay:
                                                </div>

                                            </div>
                                            <div className="row ">
                                            <span
                                                className=" pl-3 text-white font-weight-bold h5">
                                                <span className="font-weight-bold text-white"
                                                      style={{fontSize: 70 + "px"}}
                                                >{this.state.totalPrice} </span>ден
                                            </span>
                                            </div>
                                            <div className="row justify-content-center">
                                                <button className="btn btn-success btn-round w-50" onClick={this.resetTotalPrice}>I paid</button>
                                            </div>
                                        </div>
                                    </li>

                                </ul>
                            </div>
                        </div>
                    </>
                    }
                </div>
            </>
        )
    }


}

export default Order