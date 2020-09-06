import React, {Component} from 'react';
import Header from "../Header/Header";
import Restaurant from "./Restaurant";
import Order from "./Order";
import TodayOrders from "./TodayOrders";
import DTDService from "../../repository/axiosConsultationsRepository";
import Footer from "../Footer/Footer";
import Modal from "react-bootstrap/Modal";
import AuthService from "../../services/auth.service";

class Food extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            orderList: [],
            show: false,
            pricerangeState: "",
            currentUser: undefined
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadOrders();
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
            });

        }
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

    onFormSubmit = (e) => {
        e.preventDefault();


        const newRest = {
            name: e.target.name.value,
            priceRange: this.state.pricerangeState,
            image: e.target.imageURL.value,
        }

        this.handleCloseFoodModal();
        this.props.onNewRestaurantAdded(newRest);

    };
    handleInputChange = (e) => {
        this.setState({
            pricerangeState: e.target.value
        });

    };

    render() {
        const currentUser = this.state.currentUser;
        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="row justify-content-between">

                        {this.props.restaurantList.map((restaurant) =>
                            <div className="col-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 my-3 " key={restaurant.id}>
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
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <Order restaurantList={this.props.restaurantList} onNewOrderAdded={this.loadOrders}/>
                        </div>
                        <div className="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-6">
                            <TodayOrders orderList={this.state.orderList}/>
                        </div>
                    </div>
                </div>

                <div className="container-fluid  my-4" hidden={!this.state.show}>
                    <hr/>
                    <div className="row mb-3">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-10 col-12">
                            <span className={"h6"}> ADMIN PANEL</span>
                        </div>
                    </div>
                    <div className="row my-4">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-10 col-12 mb-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={this.showModal}>Add restaurant</button>
                        </div>
                    </div>
                </div>
                {currentUser &&
                ((currentUser.roles[0]!=="ROLE_USER")  &&
                    <Footer openAdmin={this.openAdmin}/>)
                }


                <Modal
                    show={this.state.showFoodModal}
                    onHide={this.handleCloseFoodModal}
                    size={"md"}
                >
                    <Modal.Header>
                        <Modal.Title id="example-modal-sizes-title-sm modal-title">
                            Add new restaurant
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="container">
                            <div className="row">
                                <div className="col-12">
                                    <form onSubmit={this.onFormSubmit} className={"row"}>
                                        <div className="col-12">

                                            <div className="form-group">
                                                <label htmlFor="name">Restaurant Name: </label>
                                                <input type="text"
                                                       placeholder={"Set restaurant name..."}
                                                       className="form-control form-control-sm title"
                                                       id="name"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="imageURL">Menu image URL: </label>
                                                <input type="text"
                                                       placeholder={"Set Menu image URL..."}
                                                       className="form-control form-control-sm title"
                                                       id="imageURL"/>
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="pricerange">Color:</label>
                                                <select id="pricerange"
                                                        name="pricerange"
                                                        onChange={this.handleInputChange}
                                                        className="form-control form-control-sm">
                                                    <option defaultValue={"Choose price range"}>Choose price range</option>
                                                    <option value="Cheap">Cheap</option>
                                                    <option value="Medium">Medium</option>
                                                    <option value="Expensive">Expensive</option>
                                                </select>
                                            </div>
                                            <div className="row form-group">
                                                <div className="col-md-12 text-right  p-0">

                                                    <button type="submit"
                                                            className="btn btn-sm btn-primary mt-2 mr-3"
                                                            title="Save"
                                                    ><i className="fa fa-fw fa-save"/> Save
                                                    </button>

                                                </div>
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
            </div>
        )
    }


}

export default Food