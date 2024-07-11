import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const events = [
  {
    start: new Date(),
    end: new Date(),
    title: "Team Meeting 10AM"
  }
];

const CustomCalendar = () => {
  return (
    <div className="card" style={{ width: '850px', height: '600px', margin: '0 auto' }}>
      <div className="card-body" >
      <div style={{ width: '800px', height: '330px', margin: '0 auto' }}>
        <h5 className="card-title">Upcoming Event</h5>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
        </div>
      </div>
    </div>
  );
};

export default CustomCalendar;
