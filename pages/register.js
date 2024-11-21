import Link from "next/link"
import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form, Alert } from "react-bootstrap";
import styles from "./register.styles.module.scss";
import MainLayout from "../components/layouts/mainlayout";
import { hashPassword } from "../lib/data-helper";

const defaultFormFields = {
    first_name: '', 
    last_name: '',
    email: '', 
    gender: '', 
    date_of_birth: '', 
    contact_no: '', 
    address: '',
    user_type: 'user', 
    password: ''

};


function Register()  {

    // useEffect(() => {
    //     const getUsers = async() => {
    //         const fetchDataReservation = await fetch('/api/users',{
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    
    //         const jsonDataReserve = await fetchDataReservation.json();
    //         console.log('data to reserve is ', jsonDataReserve);
    //     };

    //     getUsers();
    // }, []);
    

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { first_name, last_name, email, gender, date_of_birth, contact_no, address, password} = formFields;

    const handleChange = (evt) => {
        const { name, value} = evt.target;
        setFormFields({...formFields, [name]: value});
    };  

    const [errorMessage, setErrorMessage] = useState(false);
    const [successRegister, setSuccessRegister] = useState(false);

    const onSubmit = async(evt) => {
        evt.preventDefault();

        if(!first_name || !last_name || !email || !gender || !date_of_birth || !contact_no || !address || !password){ 
            setSuccessRegister(false);
            setErrorMessage('All fields are required');
            return;
        } 

        formFields.password = await hashPassword(password);
        formFields.role = 'user';
        console.log('formFields', formFields);

    
        try {
            const fetchData = await fetch('/api/users', {
                method: 'POST',
                body: JSON.stringify(formFields),
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
            });
    
            const jsonData = await fetchData.json();
            //console.log('data is ', jsonData);
    
            if(jsonData.success){
                setSuccessRegister(true);
                setErrorMessage('');
            } else {
                setErrorMessage('Failed Registering User');
                setSuccessRegister(false);
            }

         
        } catch (error) {
            console.log('error is ', error);
        }
        
    };

    return (
        <div className="mainPage">
            <Container>
            <Row>
                <Col>

                    { !successRegister &&
                        <form onSubmit={onSubmit} className={`${styles.register}`}>
                            <div className="row">
                                <h2>Register</h2>
                                <div className="col-md-12">
                                    
                                    <label htmlFor="firstName">First Name</label>
                                    <input type="text" className="form-control" id="first_name" name="first_name" onChange={handleChange}  placeholder="First Name" />                        
                                    <br />

                                    <label htmlFor="lastName">Last Name</label>
                                    <input type="text" className="form-control" id="last_name" name="last_name" onChange={handleChange}  placeholder="Last Name" />                        
                                    <br />

                                    <label htmlFor="email">Email</label>
                                    <input type="text" className="form-control" id="email" name="email" onChange={handleChange} placeholder="Ex. youremail@mail.com" />
                                    <br />

                                    <label htmlFor="gender">Gender</label>
                                    <input type="text" className="form-control" id="gender" name="gender" onChange={handleChange} placeholder="Ex. Male" />
                                    <br />

                                    <label htmlFor="dateOfBirth">Date of Birth</label>
                                    <input type="date" className="form-control" id="date_of_birth" name="date_of_birth" onChange={handleChange} placeholder="" />
                                    <br />

                                    <label htmlFor="Contact No.">Contact No.</label>
                                    <input type="text" className="form-control" id="contact_no" name="contact_no" onChange={handleChange} placeholder="Ex. +639450025521" />
                                    <br />

                                    <label htmlFor="Address">Address</label>
                                    <input type="text" className="form-control" id="address" name="address" onChange={handleChange} placeholder="Address" />
                                    <br />

                                    <label htmlFor="password">Password</label>
                                    <input type="password" className="form-control" id="password" name="password" onChange={handleChange} placeholder="Ex. A123@paswod" />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-6">
                                    <input type="submit" id="register" value="Register" className={`btn btn-outline-success ${styles.btnForm}`} />                       
                                </div>
                            </div>
                        </form>
                    }

                    { successRegister &&
                        <Alert variant="success mt-5">
                            <Alert.Heading>Success|</Alert.Heading>
                            <p>You are successfully regietrered. Click <Link href={`/`}>here</Link> to login</p>
                        </Alert>
                    }

                    { errorMessage && !successRegister &&
                        <Alert variant="danger">
                            <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                            <p>{errorMessage}</p>
                        </Alert>
                    }
                    

                </Col>
            </Row>
            </Container>
        </div>
    )
};


Register.layout = MainLayout;
export default Register;

