import React from 'react'
import {NavLink, useHistory} from 'react-router-dom';
import DTDService from "../../../repository/axiosConsultationsRepository";
import Header from "../../Header/Header";

const BookAdd = (props) => {

    const history = useHistory();


    const onFormSubmit = (e) => {
        e.preventDefault();

        e.preventDefault();

        if(e.target.isbn.value.length >= 10 || e.target.isbn.value.length <= 13){
            props.onNewBookAdded(e.target.isbn.value,e.target.qty.value);
            history.push("/library/book");
        }
    }

    return (
        <div>
            <Header/>
            <div className="container">

                <div className="row mt-5 justify-content-center align-content-center">
                    <div className="col-md-6 col-lg-6 col-sm-12 col-12">
                        <div className="card shadow" >
                            <h5 className="card-header bg-secondary text-white font-weight-bold" >Add new book</h5>
                            <div className="card-body p-5">
                                <div className="card-text">
                                    <div className="consultations">
                                        <form onSubmit={onFormSubmit}>
                                            <div className="row form-group align-items-center">
                                                <div className="col-md-3 font-right font-weight-bold"> Isbn:</div>
                                                <div className="col-md-7 text-left">
                                                    <div className="row">
                                                        <input name={"isbn"} type="text"
                                                               className="form-control"
                                                               title="Isbn"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row form-group align-items-center">
                                                <div className="col-md-3 font-right font-weight-bold"> Quantity:</div>
                                                <div className="col-md-7 text-left">
                                                    <div className="row">
                                                        <input name={"qty"} type="number"
                                                               className="form-control"
                                                               title="qty"/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-md-3 text-left">
                                                    <NavLink className={"text-reset"} to={"/resources"}>
                                                        <button type="button"
                                                                className="btn btn-secondary"
                                                                title="Back">
                                                            <i className="fa fa-angle-left"/> Back
                                                        </button>
                                                    </NavLink>
                                                </div>
                                                <div className="col-md-9 text-right">
                                                    <button type="submit" className="btn btn-primary" title="Зачувај">
                                                        <i className="fa fa-fw fa-save"/> Зачувај
                                                    </button>
                                                </div>
                                            </div>

                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default BookAdd;