import React from 'react'

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import moment from 'moment'

import DatePicker from "react-datepicker"

import Modal from "react-bootstrap/Modal"
import "bootstrap/dist/css/bootstrap.min.css"

import $ from 'jquery'
import '../App/App.css'
import {Tooltip} from "bootstrap"
import DTDService from "../../repository/axiosConsultationsRepository"


import "react-datepicker/dist/react-datepicker.css";
import Header from "../Header/Header";

export default class Calendar extends React.Component {
    _isMounted = false;

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            showEditEventModal: false,
            showNewEventModal: false,
            startDate: new Date(),
            endDate: new Date(),
            save: true,
            edit: true,
            show: false,


            // event
            id: "",
            title: "",
            start: "",
            end: "",
            description: "",
            color: "",
            allDay: false,
            calendarEventType: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputCheckboxChange= this.handleInputCheckboxChange.bind(this)
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    componentDidMount() {
        this._isMounted = true;
        (async () => {
            const response = await fetch(`http://localhost:8080/api/v1/calendar`);
            const json = await response.json();
            if (this._isMounted) {
                this.setState({
                    events: json.map(function (event) {
                        return {
                            id: event.id,
                            title: event.title,
                            start: event.start_date,
                            end: event.end_date,
                            description: event.description,
                            color: event.color,
                            allDay: event.allDay,
                            calendarEventType: event.calendarEventType
                        }
                    })
                });
            }
        })();
    }

    componentDidUpdate(prevProps, prevState) {
        this._isMounted = true;
        if (prevState.events.length !== this.state.events.length) {

            (async () => {
                const response = await fetch(`http://localhost:8080/api/v1/calendar`);
                const json = await response.json();
                if (this._isMounted) {
                    this.setState({
                        events: json.map(function (event) {
                            return {
                                id: event.id,
                                title: event.title,
                                start: event.start_date,
                                end: event.end_date,
                                description: event.description,
                                color: event.color,
                                allDay: event.allDay,
                                calendarEventType: event.calendarEventType
                            }
                        })
                    });
                }
            })();
        }
    }

    updateEvent = (event) => {
        DTDService.updateEvent(event);
    };

    addNewEvent = (event) => {
        DTDService.addEvent(event).then((response) => {
            const newEvent = response.data;
            this.setState((prevState) => {
                const newEventRef = [...prevState.events, newEvent];
                return {
                    "events": newEventRef
                }
            });
        });
    };
    deleteEvent = (id) => {
        DTDService.deleteEvent(id)
    };
    handleCloseEditModal = () => {
        this.setState({
            showEditEventModal: false
        });
    };
    handleShowEditModal = () => {
        this.setState({
            showEditEventModal: true
        });
    };

    handleCloseNewEventModal = () => {
        this.setState({

            showNewEventModal: false
        });
    };
    handleShowNewEventModal = () => {
        this.setState({
            showNewEventModal: true

        });
    };


    //This function is for adding new event
    handleDateClick = arg => {
        this.handleShowNewEventModal();
        this.handleCloseEditModal();
        this.setState({
            edit: true,
            save: false
        });
        var m = new Date();
        m = Date.parse(arg.start);
        this.handleChangeInDatePickerStart(m);
        m = Date.parse(arg.end);
        this.handleChangeInDatePickerEnd(m);
        $('.allDay').val(arg.allDay);
    };

    handleInputChange(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }
    handleInputCheckboxChange() {
        debugger;
        this.setState({
            allDay: !this.state.allDay
        });
    }

    render() {
        return (
            <><Header/>
                <div className="container">
                    <div className="row">
                        <div className="mt-4 " style={{height: 85 + 'vh'}}>

                            {/*/!*EDIT - MODAL*!/*/}
                            <Modal
                                show={this.state.showEditEventModal}
                                onHide={this.handleCloseEditModal}
                                size={"lg"}
                            >
                                <Modal.Header closeButton className={"bg-secondary text-white font-weight-bold"}>
                                    <Modal.Title id="example-modal-sizes-title-sm modal-title">
                                        Edit event
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <form onSubmit={this.onFormSubmit.bind(this)} className={"row"}>
                                                    <div className="col-6">
                                                        <div className="form-group">
                                                            <label htmlFor="title">Title: </label>
                                                            <input type="text"
                                                                   className="id"
                                                                   id="id"
                                                                   ref="id"
                                                                   hidden
                                                                   name="id"
                                                                   value={this.state.id}
                                                                   onChange={this.handleInputChange}/>
                                                            <input type="text"
                                                                   className="form-control form-control-sm title"
                                                                   id="title"
                                                                   name="title"
                                                                   placeholder={"Set title for your event"}
                                                                   value={this.state.title}
                                                                   onChange={this.handleInputChange}/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Start date: </label>
                                                            <DatePicker
                                                                className={"form-control form-control-sm start_date"}
                                                                selected={this.state.startDate}
                                                                onChange={this.handleChangeInDatePickerStart}
                                                                showTimeSelect
                                                                timeIntervals={15}
                                                                withPortal
                                                                minDate={new Date()}
                                                                showDisabledMonthNavigation
                                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                                ref="startDate"
                                                            />

                                                        </div>
                                                        <div className="form-group">
                                                            <label>End date: </label>
                                                            <DatePicker
                                                                className={"form-control form-control-sm end_date"}
                                                                selected={this.state.endDate}
                                                                onChange={this.handleChangeInDatePickerEnd}
                                                                showTimeSelect
                                                                timeIntervals={15}
                                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                                withPortal
                                                                minDate={new Date()}
                                                                showDisabledMonthNavigation
                                                                ref="endDate"

                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="description">Description</label>
                                                            <input type="text"
                                                                   className="form-control form-control-sm description"
                                                                   id="description"
                                                                   name="description"
                                                                   placeholder={"Set description for your event"}
                                                                   value={this.state.description}
                                                                   onChange={this.handleInputChange}/>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="form-group">
                                                            <label htmlFor="color">Color:</label>
                                                            <select value={this.state.color}
                                                                    name="color"
                                                                    onChange={this.handleInputChange}
                                                                    className="form-control form-control-sm selectEdit">
                                                                <option defaultValue={"Choose color"}>Choose color
                                                                </option>
                                                                <option value="#004266"
                                                                        className={"bg-primary text-white"}>Meeting
                                                                    color
                                                                </option>
                                                                <option value="#4dc7df"
                                                                        className={"bg-secondary text-white"}>Room color
                                                                </option>
                                                                <option value="#ffa73e"
                                                                        className={"bg-third text-white"}>Birthday color
                                                                </option>
                                                                <option value="#e04e2d"
                                                                        className={"bg-forth text-white"}>Other
                                                                </option>
                                                            </select>
                                                        </div>

                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="calendarEventType">calendarEventType:</label>
                                                            <select id="calendarEventType"
                                                                    name="calendarEventType"
                                                                    onChange={this.handleInputChange}
                                                                    value={this.state.calendarEventType}
                                                                    className="form-control form-control-sm calendarEventType">
                                                                <option defaultValue={"Choose event type"}>Choose event type</option>
                                                                <option value="Meeting">Meeting</option>
                                                                <option value="Birthday">Birthday</option>
                                                                <option value="Room">Room</option>
                                                                <option value="Other">Other event</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="custom-control custom-switch">
                                                                <input
                                                                    name="allDay"
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="allDay"
                                                                    checked={this.state.allDay}
                                                                    onChange={this.handleInputCheckboxChange} />

                                                                <label className="custom-control-label" htmlFor="allDay">
                                                                    All Day
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-md-12 text-right  p-0">

                                                                <button type="submit"
                                                                        className="btn btn-sm btn-primary mt-2 mr-3"
                                                                        title="Edit"
                                                                        hidden={this.state.edit}
                                                                ><i className="fa fa-fw fa-save"/> Edit
                                                                </button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>

                                            </div>
                                        </div>
                                        <div className="row text-right">
                                            <div className="col-12">
                                                <button onClick={this.handleDeleteEvent.bind(this)}
                                                        className="btn btn-sm btn-secondary mt-2"
                                                        title="Delete">
                                                    <i className="fa fa-trash"/> Delete
                                                </button>

                                                <button onClick={this.handleCloseEditModal}
                                                        className="btn btn-sm btn-secondary ml-2 mt-2 "
                                                        title="Cancel">
                                                    <i className="fa fa-fw fa-times"/> Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>

                            {/*ADD NEW EVENT - MODAL*/}
                            <Modal
                                show={this.state.showNewEventModal}
                                onHide={this.handleCloseNewEventModal}
                                size={"lg"}
                            >
                                <Modal.Header closeButton className={"bg-secondary text-white font-weight-bold"}>
                                    <Modal.Title id="example-modal-sizes-title-sm modal-title">
                                        Add new event
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    <div className="container">
                                        <div className="row">
                                            <div className="col-12">
                                                <form onSubmit={this.onFormSubmitAddNewEvent} className={"row"}>
                                                    <div className="col-6">
                                                        <div className="form-group">
                                                            <label htmlFor="title">Title: </label>
                                                            <input type="text" className="id" id="id" hidden/>
                                                            <input type="text"
                                                                   placeholder={"Set title for your event"}
                                                                   className="form-control form-control-sm title"
                                                                   id="title"/>
                                                        </div>
                                                        <div className="form-group">
                                                            <label>Start date: </label>
                                                            <DatePicker
                                                                className={"form-control form-control-sm start_date"}
                                                                selected={this.state.startDate}
                                                                onChange={this.handleChangeInDatePickerStart}
                                                                showTimeSelect
                                                                timeIntervals={15}
                                                                withPortal
                                                                minDate={new Date()}
                                                                showDisabledMonthNavigation
                                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                            />

                                                        </div>
                                                        <div className="form-group">
                                                            <label>End date: </label>
                                                            <DatePicker
                                                                className={"form-control form-control-sm end_date"}
                                                                selected={this.state.endDate}
                                                                onChange={this.handleChangeInDatePickerEnd}
                                                                showTimeSelect
                                                                timeIntervals={15}
                                                                dateFormat="MMMM d, yyyy h:mm aa"
                                                                withPortal
                                                                minDate={new Date()}
                                                                showDisabledMonthNavigation
                                                            />
                                                        </div>
                                                        <div className="form-group">
                                                            <label htmlFor="description">Description</label>
                                                            <input type="text"
                                                                   className="form-control form-control-sm description"
                                                                   placeholder={"Set description for your event"}
                                                                   id="description"/>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <div className="form-group">
                                                            <label htmlFor="color">Color:</label>
                                                            <select id="color"
                                                                    name="color"
                                                                    onChange={this.handleInputChange}
                                                                    className="form-control form-control-sm color">
                                                                <option defaultValue={"Choose color"}>Choose color
                                                                </option>
                                                                <option value="#004266"
                                                                        className={"test text-white"}>Meeting color
                                                                </option>
                                                                <option value="#4dc7df"
                                                                        className={"bg-secondary text-white"}>Room color
                                                                </option>
                                                                <option value="#ffa73e"
                                                                        className={"bg-third text-white"}>Birthday color
                                                                </option>
                                                                <option value="#e04e2d"
                                                                        className={"bg-forth text-white"}>Other
                                                                </option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <label
                                                                htmlFor="calendarEventType">Choose event type</label>
                                                            <select id="calendarEventType"
                                                                    name="calendarEventType"
                                                                    onChange={this.handleInputChange}
                                                                    className="form-control form-control-sm calendarEventType">
                                                                <option defaultValue={"Choose event type"}>Choose event type</option>
                                                                <option value="Meeting">Meeting</option>
                                                                <option value="Birthday">Birthday</option>
                                                                <option value="Room">Room</option>
                                                                <option value="Other">Other event</option>
                                                            </select>
                                                        </div>
                                                        <div className="form-group">
                                                            <div className="custom-control custom-switch">
                                                                <input
                                                                    name="allDay"
                                                                    type="checkbox"
                                                                    className="custom-control-input"
                                                                    id="allDay"
                                                                    checked={this.state.allDay}
                                                                    onChange={this.handleInputCheckboxChange} />

                                                                <label className="custom-control-label" htmlFor="allDay">
                                                                    All Day
                                                                </label>
                                                            </div>
                                                        </div>
                                                        <div className="row form-group">
                                                            <div className="col-md-12 text-right  p-0">
                                                                <button type="submit"
                                                                        className="btn btn-sm btn-primary mt-2 mr-3"
                                                                        title="Save"
                                                                        hidden={this.state.save}
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
                                                <button onClick={this.handleCloseNewEventModal}
                                                        className="btn btn-sm btn-secondary ml-2 mt-2"
                                                        title="Cancel">
                                                    <i className="fa fa-fw fa-times"/> Cancel
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Modal.Body>
                            </Modal>

                            <FullCalendar
                                defaultView="dayGridMonth"
                                eventTimeFormat={{
                                    hour: '2-digit',
                                    minute: '2-digit',
                                    hour12: false,
                                    meridiem: false
                                }}
                                displayEventEnd={true}
                                timeZone={'local'}
                                firstDay={1}
                                header={{
                                    left: 'dayGridMonth,timeGridWeek,timeGridDay',
                                    center: 'title',
                                    right: 'prev,next today'
                                }}
                                businessHours={[ // specify an array instead
                                    {
                                        daysOfWeek: [1, 2, 3, 4, 5],
                                        startTime: '08:00', // 8am
                                        endTime: '18:00' // 6pm
                                    },

                                ]}
                                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin]}
                                themeSystem={"bootstrap"}

                                events={this.state.events}

                                eventRender={this.eventRender}
                                eventTextColor={"White"}
                                select={this.handleDateClick}
                                eventResize={this.eventResize}
                                eventClick={this.eventClicked}

                                selectMirror={true}
                                height={"parent"}
                                weekNumbers={true}
                                weekNumbersWithinDays={true}
                                selectable={true}
                                editable={true}
                                unselectAuto={true}
                                nowIndicator={true}
                                eventDrop={this.eventResize}
                            />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    handleChangeInDatePickerStart = date => {
        this.setState({
            startDate: date
        });
    };
    handleChangeInDatePickerEnd = date => {
        this.setState({
            endDate: date
        });
    };

    //When i click on specific event bind the modal with this data
    eventClicked = arg => {
        this.state.events.map(
            (specificEvent) => {
                if (specificEvent.id === parseInt(arg.event.id)) {
                    this.handleShowEditModal();
                    this.handleCloseNewEventModal();
                    this.setState({
                        edit: false,
                        id: specificEvent.id,
                        title: specificEvent.title,
                        description: specificEvent.description,
                        allDay: specificEvent.allDay,
                        color: specificEvent.color,
                        calendarEventType: specificEvent.calendarEventType
                    });
                    var m = new Date();
                    m = Date.parse(specificEvent.start);
                    this.handleChangeInDatePickerStart(m);
                    m = Date.parse(specificEvent.end);
                    this.handleChangeInDatePickerEnd(m);
                }
            }
        );
    };


    handleDeleteEvent() {
        this.handleCloseEditModal();

        this.setState(prevState => ({
            events: this.state.events.filter(event => event.id !== this.state.id)
        }));
        this.deleteEvent(this.state.id);

    };

    //When edit form is submited
    onFormSubmit = (arg) => {

        arg.preventDefault();
        this.handleCloseEditModal();
        let event = {
            id: arg.target.id.value,
            title: arg.target.title.value,
            start_date: moment(this.state.startDate).format('YYYY-MM-DD HH:mm'),
            end_date: moment(this.state.endDate).format('YYYY-MM-DD HH:mm'),
            allDay: this.state.allDay,
            description: arg.target.description.value,
            calendarEventType: arg.target.calendarEventType.value,
            color: arg.target.color.value

        };
        debugger;
        this.setState(prevState => ({
            events: prevState.events.map(
                specificEvent => specificEvent.id === parseInt(event.id) ? {
                    ...specificEvent,
                    start: moment(event.start_date).format('YYYY-MM-DD HH:mm'),
                    end: moment(event.end_date).format('YYYY-MM-DD HH:mm'),
                    allDay: event.allDay,
                    color: event.color,
                    description: event.description,
                    title: event.title,
                    calendarEventType: event.calendarEventType
                } : specificEvent
            )

        }));
        this.updateEvent(event);
    };

    onFormSubmitAddNewEvent = (arg) => {
        arg.preventDefault();
        this.handleCloseNewEventModal();
        let event = {
            id: "",
            title: arg.target.title.value,
            start_date: moment(this.state.startDate).format('YYYY-MM-DD HH:mm'),
            end_date: moment(this.state.endDate).format('YYYY-MM-DD HH:mm'),
            allDay: this.state.allDay,
            description: arg.target.description.value,
            calendarEventType: arg.target.calendarEventType.value,
            color: arg.target.color.value

        };

        this.addNewEvent(event);
    };

    //This method is used when user resize the specific event, first state is changed, after changes are saved in database
    eventResize = arg => {
        let event = {
            id: arg.event.id,
            start_date: arg.event.start,
            end_date: arg.event.end,
            allDay: arg.event.allDay
        };

        this.setState(prevState => (
            {
                events: prevState.events.map(
                    specificEvent => specificEvent.id === event.id ? {
                        ...specificEvent,
                        start: event.start_date,
                        end: event.end_date,
                        allDay: event.allDay
                    } : specificEvent
                )
            }));

        this.updateEvent(event);
    };

    //Showing description on hover
    eventRender(info) {

        var tooltip = new Tooltip(info.el, {
            title: info.event.extendedProps.description,
            placement: 'top',
            trigger: 'hover',
            container: 'body'
        });

    }
}