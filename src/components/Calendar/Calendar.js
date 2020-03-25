import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap'
import listPlugin from '@fullcalendar/list';
import moment from 'moment'
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

import $ from 'jquery';
import '../App/App.css'
import {Tooltip} from "bootstrap";
import DTDService from "../../repository/axiosConsultationsRepository";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


export default class Calendar extends React.Component {

    state = {
        events: [],
        show: false,
        startDate: new Date(),
        endDate: new Date()
    };

    async componentDidMount() {
        const response = await fetch(`http://localhost:8080/api/v1/calendar`);
        const json = await response.json();

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

    updateEvent = (event) => {
        DTDService.updateEvent(event)
    };

    handleClose = () => {
        this.setState({
            show: false
        });
    };
    handleShow = () => {
        this.setState({
            show: true
        });
    };

    onFormSubmit = (arg) => {
        arg.preventDefault();
        this.handleClose();

        let event = {
            id: arg.target.id.value,
            title: arg.target.title.value,
            start_date: this.state.startDate,
            end_date: this.state.endDate,
            allDay: arg.target.allDay.value,
            description: arg.target.description.value,
            calendarEventType: arg.target.calendarEventType.value,
            color: arg.target.color.value

        };

        debugger;
        this.setState(prevState => ({
            events: prevState.events.map(
                specificEvent => specificEvent.id === parseInt(event.id) ? {
                    ...specificEvent,
                    start: event.start_date,
                    end: event.end_date,
                    allDay: event.allDay
                } : specificEvent
            )

        }));

        this.updateEvent(event);

    };

    //This function is for adding new event
    handleDateClick = arg => {
        if (window.confirm("Would you like to add an event from " + arg.startStr + "to " + arg.endStr + " ?")) {
            this.handleShow();
            this.setState({

                // add new event data
                events: this.state.events.concat({
                    id: '3',
                    title: 'event 3',
                    start: arg.start,
                    end: arg.end,
                    allDay: arg.allDay,
                    description: 'Hey Hey',
                    color: 'yellow'
                })
            });
        }
    };

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="mt-4 " style={{height: 85 + 'vh'}}>


                        <Modal
                            show={this.state.show}
                            onHide={this.handleClose}
                            size={"lg"}
                        >
                            <Modal.Header>
                                <Modal.Title id="example-modal-sizes-title-sm modal-title">
                                    Add new event
                                </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="container">
                                    <div className="row">
                                        <div className="col-12">
                                            <form onSubmit={this.onFormSubmit} className={"row"}>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label htmlFor="title">Title: </label>
                                                        <input type="text" className="id" id="id" hidden/>
                                                        <input type="text"
                                                               className="form-control form-control-sm title"
                                                               id="title"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label >Start date: </label>
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
                                                        <label >End date: </label>
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
                                                               id="description"/>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="form-group">
                                                        <label htmlFor="color">Color:</label>
                                                        <input type="text"
                                                               className="form-control form-control-sm color"
                                                               id="color"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="allDay">allDay:</label>
                                                        <input type="text"
                                                               className="form-control form-control-sm allDay"
                                                               id="allDay"/>
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="calendarEventType">calendarEventType:</label>
                                                        <input type="text"
                                                               className="form-control form-control-sm calendarEventType"
                                                               id="calendarEventType"/>
                                                    </div>
                                                    <div className="row form-group">
                                                        <div className="col-md-12 text-right  p-0">
                                                            <button type="submit"
                                                                    className="btn btn-sm btn-primary mt-2"
                                                                    title="Save"
                                                            >
                                                                <i className="fa fa-fw fa-save"/> Save
                                                            </button>


                                                        </div>
                                                    </div>
                                                </div>
                                            </form>
                                            <button onClick={this.handleClose}
                                                    className="btn btn-sm btn-danger ml-2 mt-2"
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
                            defaultDate={new Date()}
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
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin, listPlugin]}
                            themeSystem={"bootstrap"}

                            events={this.state.events}

                            eventRender={this.eventRender}

                            select={this.handleDateClick}
                            eventResize={this.eventResize}
                            eventClick={this.eventClicked}

                            lazyFetching={false}
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


        let event = {
            id: arg.event.id,
            title: arg.event.title,
            start_date: arg.event.start,
            end_date: arg.event.end,
            allDay: arg.event.allDay,
            description: arg.event.extendedProps.description,
            calendarEventType: arg.event.extendedProps.calendarEventType,
            color: arg.event.backgroundColor

        };
        debugger;
        this.handleShow();
        $('.title').val(event.title);
        $('.id').val(event.id);
        this.handleChangeInDatePickerStart(event.start_date);
        this.handleChangeInDatePickerEnd(event.end_date);
        $('.description').val(event.description);
        $('.allDay').val(event.allDay);
        $('.color').val(event.color);
        $('.calendarEventType').val(event.calendarEventType);

    };




    //This method is used when user resize the specific event, first state is changed, after changes are saved in database
    eventResize = arg => {
        let event = {
            id: arg.event.id,
            start_date: arg.event.start,
            end_date: arg.event.end,
            allDay: arg.event.allDay
        };
        debugger;
        this.setState(prevState => (
            {
                events: prevState.events.map(
                    specificEvent => specificEvent.id === event.id ? {
                        ...specificEvent,
                        start: event.start,
                        end: event.end,
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