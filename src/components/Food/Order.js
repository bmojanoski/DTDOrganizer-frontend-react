import React, {Component} from 'react';
import DTDService from "../../repository/axiosConsultationsRepository";
import Modal from "react-bootstrap/Modal";
import {toast} from 'react-toastify'

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
            showFoodModal: false,
            restaurantList: this.props.restaurantList,
        };
    }

    validateForm() {
        return this.state.selectedRestaurant.length > 0
            && this.state.inputs.food[0].length > 1
            && this.state.inputs.price[0].length > 1;
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
            }else{
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
            ]
        };

        DTDService.postOrder(order).then((response) => {
            if (response.status === 200) {
                this.notifySuccess();
                this.props.onNewOrderAdded(order);
                this.setState({

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


    handleCloseFoodModal = () => {
        this.setState({
            showFoodModal: false
        });
    };
    handleShowFoodModal = () => {
        this.setState({
            showFoodModal: true
        });
    };
    showModal = () => {
        this.handleShowFoodModal();
    };

    render() {
        return (<>

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
                                <div className="row pb-3"><span className="h5">Step 2: Write your order</span></div>
                                <div className="row justify-content-start ">
                                    <div className="col-12">
                                        <div className="form-row">
                                            <div className="form-group col-4  text-left">
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
                                            <div className="form-group col-3  text-left">
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
                                            <
                                                div
                                                className="form-group col-5  text-left">
                                                < label
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

                <Modal
                    show={this.state.showFoodModal}
                    onHide={this.handleCloseFoodModal}
                    size={"md"}
                >
                    <Modal.Header>
                        <Modal.Title id="example-modal-sizes-title-sm modal-title">
                            Add new food for specific restaurant
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form onSubmit={this.onFormSubmitAddNewEvent} className={"row"}>
                                        <div className="col-12">
                                            <div className="form-group">
                                                <label htmlFor="title">Restaurant: </label>
                                                <select value={this.state.selectedRestaurantForFood}
                                                        onChange={(e) => this.setState({selectedRestaurantForFood: e.target.value})}
                                                        className="form-control"
                                                >
                                                    <option defaultValue="">Choose restaurant to add food</option>
                                                    {this.state.restaurantList.map((restaurant) => <option
                                                        key={restaurant.id}
                                                        value={restaurant.name}>{restaurant.name}</option>)}
                                                </select>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="description">Food name: </label>
                                                <input type="text"
                                                       className="form-control form-control-sm food_name"
                                                       id="food_name"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="color">Food price</label>
                                                <input type="text"
                                                       className="form-control form-control-sm food_price"
                                                       id="food_price"/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row text-right">
                                <div className="col-12">
                                    <button onClick={this.handleCloseFoodModal}
                                            className="btn btn-sm btn-danger ml-2 mt-2"
                                            title="Cancel">
                                        <i className="fa fa-fw fa-times"/> Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </Modal>
            </>
        )
    }


}

export default Order