import { useState } from "react";
import { Container, Row, Col, Alert } from "react-bootstrap";
import Image from "next/image";
import styles from "./login.styles.module.scss";
import { isValidEmail } from "./lib/helpers";
import { useRouter } from "next/compat/router";
import MainLayout from "./components/layouts/mainlayout";


const defaultFormFields = {
  email: '', 
  password: ''
};

function Home() {

  const router = useRouter();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const handleChange = (evt) => {
      const { name, value} = evt.target;
      setFormFields({...formFields, [name]: value});
  };  

  const [errorMessage, setErrorMessage] = useState(false);

  return (

    <div className="mainPage">
      <Container>
        <Row>
          <Col>
          
              <form className={`${styles.login}`}>
                  <div className="row">
                      <h2>Login</h2>
                      <div className="col-md-12">
                          <label htmlFor="email">Email</label>
                          <input type="text" className="form-control" id="email" name="email" value={email} onChange={handleChange} placeholder="Ex. youremail@mail.com" />
                          <br />
                          <label htmlFor="password">Password</label>
                          <input type="password" className="form-control" id="password" name="password" value={password} onChange={handleChange} placeholder="Ex. A123@paswod" />
                      </div>
                  </div>

                  <div className="row">
                      <div className="col-md-6">
                          <input type="submit" id="register" value="Login" className={`btn btn-outline-success ${styles.btnForm}`} />                       
                      </div>
                  </div>
              </form>


              { errorMessage &&
              <Alert variant="danger">
                  <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                  <p>{errorMessage}</p>
              </Alert>
              }

          </Col>
        </Row>
      </Container>
    </div>


  );



}

Home.layout = MainLayout;
export default Home;