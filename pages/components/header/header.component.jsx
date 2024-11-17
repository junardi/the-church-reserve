import { Fragment } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
const { Brand } = Navbar
import styles from './header.styles.module.scss';
import Link from "next/link";

const Header = () => {

  return (
    <Navbar
      expand="lg"
      className={`${styles.headerContainer}`}
    >
      <Container>
        <Navbar.Brand  href="/">Saint James The Greater Parish Church</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.customNavbar}>
            <Link href="/">Login</Link>
            <Link href="/register">Register</Link>
        
            {/* { !isAuthenticated() &&
            <Fragment>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/register">Register</Nav.Link>
            </Fragment>
            }

            { isAuthenticated() && 
              <Fragment>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/user-reservations">Reservations</Nav.Link>
                <Nav.Link className={styles.logout} href="#" onClick={(evt) => doLogout(evt)}>Logout</Nav.Link>
              </Fragment>
            } */}
          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
  );


};


export default Header;