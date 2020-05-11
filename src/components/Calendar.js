import React, { useState, useEffect } from 'react';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function TrainingCalendar() {

    const localizer = momentLocalizer(moment);
    const allViews = Object.keys(Views).map(k => Views[k]);

    const [trainingEvents, setTrainingEvents] = useState([]);

    useEffect(() => {
        getTrainings();
    })
    
    const getTrainings = () => {
        fetch('https://customerrest.herokuapp.com/gettrainings')
        .then(response => response.json())
        .then(data => {
            for (let i = 0; i < data.length; i++){
                trainingEvents.push(
                    {
                        title: data[i].activity +' / '+ data[i].customer.firstname +' '+ data[i].customer.lastname,
                        start: moment(data[i].date)._d,
                        end: moment(data[i].date).add(data[i].duration, 'minutes')._d
                    }
                );
            };
        })
        .catch(err => console.error(err))
    }
    console.log(trainingEvents);

    return(
        <div style={{ height: 650 }}>
            <Calendar
                localizer={localizer}
                events={trainingEvents}
                views={allViews}
                startAccessor="start"
                endAccessor="end"
            />
        </div>
    );
}