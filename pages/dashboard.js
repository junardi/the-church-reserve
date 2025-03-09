import { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import style from "./dashboard.styles.module.scss";
import MainLayout from "@/components/layouts/mainlayout";
import { useSession } from "next-auth/react";
import NonSSRWrapper from "@/components/nonssr/nonssr.component";

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


function Dashboard() {

    const { data: session } = useSession();
    // console.log('Status ', status);
    //console.log('Session ', session);

    // value will be the date 
    const [value, onChange] = useState(new Date());

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

        const date = new Date(value);
        const formattedDate = date.toISOString().split('T')[0];

        const data = {
            details: details, 
            user_id: session.user.id, 
            status: status,
            paid: paid,
            date: formattedDate,
            time: time, 
            event: event
        };

        //console.log('data is ', data);

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
                setFormFields(defaultFormFields);
            } else {
               alert('Failed request booking');
            }

         
        } catch (error) {
            console.log('error is ', error);
        }

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
                                <Calendar onChange={onChange} value={value} />
                            </NonSSRWrapper>
                        </div>
                    </Col>

                    <Col>
                        <Form.Check
                            className={style.timeDiv}
                            label="7:00 AM - 8:30 AM"
                            type="radio"
                            name="time"
                            value="7:00 AM - 8:30 AM"
                            onChange={handleChange}
                        />

                        <Form.Check
                            className={style.timeDiv}
                            label="9:00 AM - 10:30 AM"
                            type="radio"
                            name="time"
                            value="9:00 AM - 10:30 AM"
                            onChange={handleChange}
                        />

                        <Form.Check
                            className={style.timeDiv}
                            label="11:00 AM - 12:30 AM"
                            type="radio"
                            name="time"
                            value="11:00 AM - 12:30 AM"
                            onChange={handleChange}
                        />

                        <Form.Check
                            className={style.timeDiv}
                            label="1:00 PM - 2:30 PM"
                            type="radio"
                            name="time"
                            value="1:00 PM - 2:30 PM"
                            onChange={handleChange}
                        />

                        <Form.Check
                            className={style.timeDiv}
                            label="3:00 PM - 4:30 PM"
                            type="radio"
                            name="time"
                            value="3:00 PM - 4:30 PM"
                            onChange={handleChange}
                        />

                        <Form.Check
                            className={style.timeDiv}
                            label="5:00 PM - 6:30 PM"
                            type="radio"
                            name="time"
                            value="5:00 PM - 6:30 PM"
                            onChange={handleChange}
                        />
                    </Col>
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
                            
                            <Form.Control name="details" onChange={handleChange} as="textarea" placeholder="Name, details, requests and etc. during the event" rows={10} />
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
