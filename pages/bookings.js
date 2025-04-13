import { Container, Row, Col, Form, Button, Table, Modal } from "react-bootstrap";
import MainLayout from "@/components/layouts/mainlayout";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import moment from "moment";

function Bookings () {

    const { data: session } = useSession();

    const [bookingsList , setBookingsList] = useState([]);
    const [trigger, setTrigger] = useState(false);

    const [bookingToPay, setBookingToPay] = useState(null);

    useEffect(() => {

        //console.log(session?.user?.id);
        const user_id = session?.user?.id;

        const getUserBookings = async() => {
            const fetchDataReservation = await fetch(`/api/users/${user_id}`,{
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

        if(user_id) {
            getUserBookings();
        }
       
    }, [session, trigger]);


    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = (el) => {
        setBookingToPay(el);
        setShow(true);
    };

    const handleSubmit = async(transactionId) => { 
        console.log('transactionId ', transactionId);

        const data = {
            transaction_code: transactionId, 
            paid: 1, 
            booking_id: bookingToPay.booking_id
        };

        console.log('data to update since paid is ', data);

        try {
            const fetchData = await fetch('/api/pay', {
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
                alert('Payment Updated');
            } else {
                handleClose();
               alert('Failed Payment');
            }
         
        } catch (error) {
            console.log('error is ', error);
        }

    };

    const checkStatus = (status) => {
        if(status === 'pending' || status === 'approved') {
            return 'pending';
        }
        return status;
    }

    //console.log('bookingsList is ', bookingsList);

    console.log('booking to pay is ', bookingToPay);

    return (
        <div className="mainPage">
            
            <Container>
                <Row>
                    <Col>
                        <h1>Bookings</h1>

                        <Table striped hover>
                            <thead>
                                <tr>
                                    <th>Details</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th>Time</th>
                                    <th>Event</th>
                                    <th>Amount to Pay</th>
                                    <th>Transaction Code (If Paid)</th>
                                    <th>Reason if Not approved</th>
                                    <th>For Payment</th>
                                    
                                </tr>
                            </thead>

                            <tbody>

                                {
                                    bookingsList.map((el, index) => {

                                        const {amount, booking_id, date, details, event, paid, status, time, user_id, transaction_code, reason} = el;
                                        return (
                                            <tr key={index}>
                                                <td>{details}</td>
                                                <td>{checkStatus(status)}</td>
                                                <td>{moment(date).format("MMMM D, YYYY")}</td>
                                                <td>{time}</td>
                                                <td>{event}</td>
                                                <td>{amount}</td>
                                                <td>{transaction_code}</td>
                                                <td>{reason}</td>
                                                <td>
                                                    { status === 'approved' && !paid &&
                                                        <Button onClick={() => handleShow(el)}>Pay Now</Button>
                                                    }
                                                    { status === 'pending' && !paid &&
                                                        <span>Not approved</span>
                                                    }

                                                    { status === 'approved' && paid === 1 &&
                                                        <span>Paid</span>
                                                    }

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
            
            { show && bookingToPay &&
                <Modal show={show} onHide={handleClose}>

                    <Modal.Header closeButton>
                        <Modal.Title>Pay Event</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <p>You will be paying {bookingToPay.amount} for {bookingToPay.event}</p>
                        <PayPalScriptProvider options={{ "client-id": "AdnJz30CsNDDHGab1xjrnkzmy-Di2WyvpReCI4mO3ZmET8pU2ZNM4IFU6sR0RJxwzPqePGX7rcJzTWIV", "currency": "PHP" }}>                              
                        <PayPalButtons 
                            createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                {
                                    description: `${bookingToPay.event}`,
                                    amount: {
                                        value: bookingToPay.amount
                                    }
                                },
                                ],
                                application_context: { 
                                brand_name: 'Reservation',
                                shipping_preference: 'NO_SHIPPING'
                                }        
                            });
                            }}
                            onApprove={(data, actions) => {
                            return actions.order.capture().then((details) => {
                                
                                //console.log(details);
                                //const name = details.payer.name.given_name;
                                //alert(`Transaction completed by ${name}`);

                                const transactId = details.purchase_units[0].payments.captures[0].id;
                                //console.log(transactId);
                                handleSubmit(transactId);
                                
                            });
                            }}
                        />
                        </PayPalScriptProvider>
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>

                </Modal>
            }
    
        </div>
    )
}

Bookings.layout = MainLayout;

export default Bookings;