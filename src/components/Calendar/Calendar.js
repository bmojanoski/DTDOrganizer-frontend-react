import React from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import bootstrapPlugin from '@fullcalendar/bootstrap'

import '../App/App.css'
import {Tooltip} from "bootstrap";


export default class Calendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [
                {
                    title: 'event 1',
                    start: '2020-03-03',
                    end: '2020-03-05',
                    color: 'yellow',
                    textColor: 'black',
                    description: 'Lecture2'
                },
                {
                    title: 'event 2',
                    start: "2020-03-05T09:00:00",
                    end: "2020-03-06T18:00:00",
                    extendedProps: {
                        department: 'BioChemistry'
                    },
                    description: 'Lecture1'
                }
            ]
        }
    }

    handleSelect = (selectedInfo) => {
        alert(selectedInfo.event.title)
        //this.setState({ startTime: selectedInfo.startStr})
       // console.log("working!!", this.state.startTime)
    }
    addEvent(){
        alert("hey")
    }
    eventRender(info) {
        var tooltip = new Tooltip(info.el, {
            title: info.event.extendedProps.description,
            placement: 'top',
            trigger: 'hover',
            container: 'body'
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12 col-12 mt-4" style={{height: 85 + 'vh'}}>
                        <FullCalendar
                            defaultView="dayGridMonth"
                            header={{
                                left: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek',
                                center: 'title',
                                right: 'prev,next today, addEvent'
                            }}

                            weekNumbers={true}
                            height={"parent"}
                            eventLimit={true}
                            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, bootstrapPlugin]}
                            themeSystem={"bootstrap"}
                            weekends={false}
                            eventRender={this.eventRender}
                            events={this.state.events}
                            selectable={true}
                            editable={true}
                            selectMirror={true}
                            eventClick={this.handleSelect}
                            customButtons={{
                                "addEvent": {
                                    text: 'Add event',
                                    click: function () {
                                    }
                                }}
                            }


                        />
                    </div>
                </div>
            </div>

        )
    }

}