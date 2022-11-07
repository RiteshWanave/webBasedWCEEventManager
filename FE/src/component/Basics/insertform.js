import { React, useState } from 'react'
import './insertform.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import TimePicker from 'react-time-picker';

function Insertform( {eventDate} ) {
    const [eventName, setEventName] = useState('');
    const [about, setAbout] = useState('');
    const [duration, setDuration] = useState('');
    const [startTime, setStartTime] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventLink, setEventLink] = useState('');
    const navigate = useNavigate();

    const SubmitButton = async () => {
        try {
            if(eventName && about && duration && startTime && eventLocation && eventLink) {
                const newCalendar = {
                    eventname: eventName,
                    description: about,
                    duration: duration,
                    starttime: startTime,
                    location: eventLocation,
                    link: eventLink,
                    date: eventDate
                }
                const res = await axios.post('http://localhost:5000/insertevent',  newCalendar );
                if(res.status === 200) {
                    alert('Event Added Successfully');
                    setEventName('');
                    setAbout('');
                    setDuration('');
                    setStartTime('');   
                    setEventLocation('');
                    setEventLink('');
                    navigate('/daywiseevents');
                }
            }
        }
        catch(err) {
            console.log(err);
        }
    }

    const [ time, setTime ] = useState('10:00');
    const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return (
        <>
            <div className='insertformbody'>
                <div>
                    <form onSubmit={SubmitButton} action=' '>
                        <h1>Book Slot on {eventDate.getDate().toString() + " " + month[eventDate.getMonth()] + " " + eventDate.getFullYear().toString()} </h1>
                        <br /><br />
                        <input className='insertformbodyinput' type="text" placeholder="Event Name" value={eventName} onChange={(e) => setEventName(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Event Location" value={eventLocation} onChange={(e) => setEventLocation(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Event Link" value={eventLink} onChange={(e) => setEventLink(e.target.value)} />
                        <input className='insertformbodyinput' type="text" placeholder="Description" value={about} onChange={(e) => setAbout(e.target.value)} />
                        <br />
                        <button type="submit" className='buttonloginpage' >Submit</button>   
                    </form>
                </div>
                <TimePicker value={time} onChange={(time) => setTime(time) } />
            </div>
        </>
    )
}

export default Insertform