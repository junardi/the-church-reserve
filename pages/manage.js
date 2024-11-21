import { Container, Row, Col, Form, Button, Table, Modal } from "react-bootstrap";
import MainLayout from "@/components/layouts/mainlayout";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import moment from "moment";



function Bookings () {

    const [theStatus, setTheStatus] = useState('');
    const [theAmount, setTheAmount] = useState('');



    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (el) => {
        setBookingToUpdate(el);
        setTheStatus('approved');
        setShow(true);
    }

    const [bookingsList , setBookingsList] = useState([]);
    const [bookingToUpdate, setBookingToUpdate] = useState(null);

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
                setBookingsList(jsonDataReserve.data);
            }
        
        };

        getBookings();
        
    }, [trigger]);


    const updateBooking = async(evt) => {
        evt.preventDefault();
        const data = {
            amount: theAmount,
            status: theStatus,
            booking_id: bookingToUpdate.booking_id
        };
        console.log('data to update is ', data); 
        
        try {
            const fetchData = await fetch('/api/bookings', {
                method: 'PUT',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
    
            const jsonData = await fetchData.json();
            //console.log('data is ', jsonData);
            if(jsonData.success){
                handleClose();
                setTrigger(!trigger);
                alert('Updated booking');
            } else {
                handleClose();
               alert('Failed booking update');
            }
         
        } catch (error) {
            console.log('error is ', error);
        }
    };

    const deleteBooking = async(booking_id) => {

        const data = {
            booking_id: booking_id
        };

        try {
            const fetchData = await fetch('/api/bookings', {
                method: 'DELETE',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
    
            const jsonData = await fetchData.json();
            //console.log('data is ', jsonData);
            if(jsonData.success){
                
                setTrigger(!trigger);
                alert('Booking deleted');
            } else {
              
               alert('Failed delete booking');
            }
         
        } catch (error) {
            console.log('error is ', error);
        }

    }

    // console.log('bookingsList is ', bookingsList);
    // console.log('bookingToUpdate is ', bookingToUpdate);

    return (
        <div className="mainPage">
            <Container>
                <Row>
                    <Col>
                        <h1>Manage Bookings</h1>

                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>Details</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Event</th>
                                    <th>Amount</th>
                                    <th>Paid</th>
                                    <th>Transaction code (if paid)</th>
                                    <th>Update</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    bookingsList.map((el, index) => {

                                        const {amount, booking_id, date, details, event, paid, status, time, user_id, transaction_code} = el;
                                        return (
                                            <tr key={index}>
                                                <td>{details}</td>
                                                <td>{status}</td>
                                                <td>{moment(date).format("MMMM D, YYYY")}</td>
                                                <td>{time}</td>
                                                <td>{event}</td>
                                                <td>{amount}</td>
                                                <td>{paid ? 'Yes' : 'No'}</td>
                                                <td>{transaction_code}</td>
                                                <td>
                                                    
                                                    { status === 'pending' &&
                                                        <Button variant="secondary" onClick={() => handleShow(el)}>Update</Button>
                                                    }

                                                    { status === 'approved' &&
                                                        <span>Its Approved</span>
                                                    }


                                                </td>

                                                <td>
                                                    <Button variant="danger" onClick={() => deleteBooking(booking_id)}>Delete</Button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            
                            </tbody>
                        </Table>

                    </Col>
                </Row>
            </Container>
            
            { show &&
            <Modal show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>{bookingToUpdate.event}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <form onSubmit={updateBooking}>
                        <Form.Label htmlFor="status">Status</Form.Label>
                        <Form.Select name="theStatus" aria-label="Default select example" onChange={(e) => setTheStatus(e.target.value)}>
                            {/* <option value={bookingToUpdate.status}>{bookingToUpdate.status}</option>
                            <option value="pending">pending</option> */}
                            <option value="approved">approved</option>
                        </Form.Select>

                        <Form.Label className="pt-3" htmlFor="amount">Amount</Form.Label>
                        <Form.Control
                            type="number"
                            id="amount"
                            name="theAmount"
                            aria-describedby="AMount"
                            value={theAmount}
                            onChange={(e) => setTheAmount(e.target.value)}
                        />

                        <Button className="mt-3" type="submit">Update</Button>
                    </form>
                </Modal.Body>

            </Modal>
            }


        </div>
       
    )
}

Bookings.layout = MainLayout;

export default Bookings;