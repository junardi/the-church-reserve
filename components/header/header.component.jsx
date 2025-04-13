import { Fragment } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
const { Brand } = Navbar
import styles from './header.styles.module.scss';
import Link from "next/link";
import Image from "next/image";

import { useSession } from "next-auth/react";

import { signOut } from "next-auth/react";

const Header = () => {

  const { data: session, status } = useSession();

  //console.log('seesion is ', session);

  const doLogout = async(evt) => {
    evt.preventDefault();

    //console.log('lets signout');
    await signOut({redirect: true, callbackUrl: "/"});
  }

  return (
    <Navbar
      expand="lg"
      className={`${styles.headerContainer}`}
    >
      <Container>
        <Image
          src="/logo.jpeg"
          width={50} 
          height={50}
          alt="logo"
          style={{marginRight: '10px'}}
        />
        <Navbar.Brand className={styles.brand}  href="/">Saint James The Greater Parish Church</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={styles.customNavbar}>

            { status === 'authenticated' && 
              <Fragment>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/bookings">My Reservations</Nav.Link>
                { session.user.role === 'admin' &&
                <Nav.Link href="/manage">Manage Reservations</Nav.Link>
                }

                <Nav.Link className={styles.logout} href="#" onClick={(evt) => doLogout(evt)}>Logout</Nav.Link>                               
              </Fragment>
            }

            { status !== 'authenticated' && 
            <Fragment>
              <Link href="/">Login</Link>
              <Link href="/register">Register</Link>
            </Fragment>
            }
        
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