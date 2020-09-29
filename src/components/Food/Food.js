import React, {Component} from 'react';
import Header from "../Header/Header";
import Restaurant from "./Restaurant";
import Order from "./Order";
import TodayOrders from "./TodayOrders";
import DTDService from "../../repository/axiosConsultationsRepository";
import Modal from "react-bootstrap/Modal";
import AuthService from "../../services/auth.service";
import RestaurantCarousel from "../Carousel/RestaurantCarousel";

class Food extends Component {
    _isMounted = false;

    constructor(props) {
        super(props);

        this.state = {
            orderList: [],
            show: false,
            pricerangeState: "",
            currentUser: undefined,
            allOrdersBtn: false,
            makeOrderBtn: true
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.loadOrders();
        const user = AuthService.getCurrentUser();
        if (user) {
            this.setState({
                currentUser: user,
                currentUserRole : user.roles[0]
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

    seeAllOrders = (e) => {
        this.setState({
            allOrdersBtn: !this.state.allOrdersBtn,
            makeOrderBtn: !this.state.makeOrderBtn
        })
    };

    makeOrder = (e) => {

        this.setState({
            makeOrderBtn: !this.state.makeOrderBtn,
            allOrdersBtn: !this.state.allOrdersBtn
        })
    };

    render() {
        const currentUserRole = this.state.currentUserRole !== "ROLE_USER";
        return (
            <div>
                <Header/>
                <div className="container-fluid bg-secondary carousel-div">
                    <div className="container">
                        <RestaurantCarousel
                            restaurant={this.props.restaurantList}
                        />
                    </div>
                </div>
                <div className="container mt-3">
                    {(currentUserRole) && (
                    <div className="row my-4">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-10 col-12 mb-2">
                            <button className="btn btn-sm btn-outline-primary" onClick={this.showModal}>Add restaurant
                            </button>
                        </div>
                    </div>)}
                    <div className="row">
                        <div className="container ">
                            <div className="row justify-content-center">
                                <div className="btn-group btn-group-toggle my-2 shadow rounded" data-toggle="buttons">
                                    <label className={'btn btn-primary active '}>
                                        <input type="radio"
                                               name="options"
                                               id={"makeOrdersBtn"}
                                               onClick={this.makeOrder.bind(this)}
                                               disabled={this.state.makeOrderBtn}/> Make an order
                                    </label>
                                    <label className={'btn btn-primary '}>
                                        <input type="radio"
                                               name="options"
                                               id={"allOrdersBtn"}
                                               onClick={this.seeAllOrders.bind(this)}
                                               disabled={this.state.allOrdersBtn}/> See all today's orders
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>

                    {(this.state.makeOrderBtn) &&
                    <Order restaurantList={this.props.restaurantList} onNewOrderAdded={this.loadOrders}/>
                    }

                    <div className="row">
                        <div className="col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12">
                            {(this.state.allOrdersBtn) &&
                            <TodayOrders orderList={this.state.orderList}/>
                            }
                        </div>
                    </div>
                </div>
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
                                                    <option defaultValue={"Choose price range"}>Choose price range
                                                    </option>
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