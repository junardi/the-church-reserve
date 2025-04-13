import { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import style from "./dashboard.styles.module.scss";
import MainLayout from "@/components/layouts/mainlayout";
import { useSession } from "next-auth/react";
import NonSSRWrapper from "@/components/nonssr/nonssr.component";
import moment from "moment";

import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';

const events = [
    'Burial', 
    'Wedding', 
    'Baptismal', 
    'House Blessings'
];

const defaultFormFields = {
    details: '',    
    status: 'pending', 
    paid: 0,
    time: '', 
    event: ''
};

const specialDates = [
    [0, 1],   // Jan 1
    [0, 29],  // Apr 13
    [1, 25], // Dec 25
    [3, 9],
    [3, 17],
    [3, 18], 
    [3, 19],
    [4, 1],
    [5, 12], 
    [7, 21], 
    [7, 25], 
    [9, 31], 
    [10, 1],
    [10, 30],
    [11, 8], 
    [11, 24], 
    [11, 25], 
    [11, 30],
    [11, 31] 
];

const formatDateLocal = (date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0'); // months are 0-indexed
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };


function Dashboard() {


    const [bookingsList , setBookingsList] = useState([]);
    
    const [trigger, setTrigger] = useState(false);

    useEffect(() => {

        const getBookings = async() => {
            const fetchDataReservation = await fetch(`/api/bookings`,{
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const jsonDataReserve = await fetchDataReservation.json();
            if(jsonDataReserve.data) {
               
                const data = jsonDataReserve.data.filter(el => {
                    if(el.status !== 'disapproved') {
                        return el;
                    }
                });

                const mapData = data.map(el => {
                    el.date = moment(el.date).format("YYYY-MM-DD");
                    return el;
                });


                console.log('booking datas ', mapData);
                setBookingsList(mapData);
            }
        
        };

        getBookings();
        
    }, [trigger]);



    const { data: session } = useSession();
    // console.log('Status ', status);
    //console.log('Session ', session);

    // value will be the date 
    //const [value, onChange] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);

    const [unavailableItems, setUnavailableItems] = useState([]);
    const handleDateChange = (date) => {

        //console.log('date is ', moment(date).format("YYYY-MM-DD"));
        setSelectedDate(date);


        const dateToCheck = moment(date).format("YYYY-MM-DD");
        const matchingItems = bookingsList.filter(item => 
            item.date === dateToCheck
        );
        
        console.log(matchingItems);

        setUnavailableItems(matchingItems);
        
    };

    const checkItems = (value) => {
        const find = unavailableItems.find(item => item.time === value);
        if(find) {
            return true;    
        } else {
            return false;
        }
    }


    const [formFields, setFormFields] = useState(defaultFormFields);
    const { details, status, paid, time, event } = formFields;

    const handleChange = (evt) => {
        const { name, value} = evt.target;
        setFormFields({...formFields, [name]: value});
    };

    const handleSubmit = async(evt) => {
        evt.preventDefault();

        // console.log('formFields', formFields);    
        // console.log('value is date', value);

        // console.log('details ', details);
        // console.log('user_id ', user_id);
        // console.log('status ', status);
        // console.log('paid ', paid);
        // console.log('date ', date);
        // console.log('time ', time);

        const date = new Date(selectedDate);
        // console.log('date is ', date);
        const formattedDate = formatDateLocal(date);

        const data = {
            details: details, 
            user_id: session.user.id, 
            status: status,
            paid: paid,
            date: formattedDate,
            time: time, 
            event: event
        };

        console.log('data is ', data);

        try {
            const fetchData = await fetch('/api/bookings', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
    
            const jsonData = await fetchData.json();
            console.log('data is ', jsonData);

        

            if(jsonData.success){
                alert('Requested booking');
                window.location.reload();
            } else {
               alert('Failed request booking');
            }

    
         
        } catch (error) {
            console.log('error is ', error);
        }

    };


    const tileClassName = ({ date, view }) => {
        if (view === 'month') {
        const month = date.getMonth();
        const day = date.getDate();

        const isSpecial = specialDates.some(([m, d]) => m === month && d === day);
        if (isSpecial) {
            return 'highlight-date';
        }
        }

        return null;
    };


    return(
        <div className="mainPage">
            <Container>

                <Row>
                    <Col>
                        <h1 className="mb-5">Available Date and Time Slot</h1>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div>
                            <NonSSRWrapper>
                                <Calendar onChange={handleDateChange} value={selectedDate} tileClassName={tileClassName} />
                            </NonSSRWrapper>
                        </div>
                    </Col>

                    { selectedDate &&
                    <Col className="timeSelections">
                        <Form.Check
                            className={style.timeDiv}
                            label="7:00 AM - 8:30 AM"
                            type="radio"
                            name="time"
                            value="7:00 AM - 8:30 AM"
                            onChange={handleChange}
                            disabled={checkItems('7:00 AM - 8:30 AM')}
                        />

                        <Form.Check
                            className={style.timeDiv}
                            label="9:00 AM - 10:30 AM"
                            type="radio"
                            name="time"
                            value="9:00 AM - 10:30 AM"
                            onChange={handleChange}
                            disabled={checkItems('9:00 AM - 10:30 AM')}
                        />

                        <Form.Check
                            className={style.timeDiv}
                            label="11:00 AM - 12:30 AM"
                            type="radio"
                            name="time"
                            value="11:00 AM - 12:30 AM"
                            onChange={handleChange}
                            disabled={checkItems('11:00 AM - 12:30 AM')}
                        />

                        <Form.Check
                            className={style.timeDiv}
                            label="1:00 PM - 2:30 PM"
                            type="radio"
                            name="time"
                            value="1:00 PM - 2:30 PM"
                            onChange={handleChange}
                            disabled={checkItems('1:00 PM - 2:30 PM')}
                        />

                        <Form.Check
                            className={style.timeDiv}
                            label="3:00 PM - 4:30 PM"
                            type="radio"
                            name="time"
                            value="3:00 PM - 4:30 PM"
                            onChange={handleChange}
                            disabled={checkItems('3:00 PM - 4:30 PM')}
                        />

                        <Form.Check
                            className={style.timeDiv}
                            label="5:00 PM - 6:30 PM"
                            type="radio"
                            name="time"
                            value="5:00 PM - 6:30 PM"
                            onChange={handleChange}
                            disabled={checkItems('5:00 PM - 6:30 PM')}
                        />
                    </Col>
                    }

                    { !selectedDate && 
                        <Col>
                            <p className="mt-5">Select a date for time selection.</p>
                        </Col>
                    }


                </Row>

                <hr></hr>
                <Row className="mt-2">
                    <Col>
                        <p><strong>Types of Services</strong></p>
                        <Form.Select aria-label="Default select example" name="event" onChange={handleChange} value={event}>
                            <option value="">Select Event</option>
                            {
                                events.map((el, index) => {
                                    return (
                                        <option value={el} key={index}>{el}</option>
                                    )
                                })
                            }
                        </Form.Select>
                    </Col>
                </Row>

                <Row className="mt-2">
                    <Col>
                        <p className="pt-3"><strong>Details (Price will vary upon checking of users request details)</strong></p>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            
                            <Form.Control name="details" onChange={handleChange} as="textarea" placeholder="Name, details, requests are required to be provided. You can add other details to be reviewed by the church for flexibility of requests or suggestions from customer." rows={10} />
                        </Form.Group>
                    </Col>
                </Row>

                <Button onClick={(evt) => handleSubmit(evt)}>Submit</Button>


            </Container>
        </div>       
    )

}

Dashboard.layout = MainLayout;
export default Dashboard;
