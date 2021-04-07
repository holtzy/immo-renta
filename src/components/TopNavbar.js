import "./topNavbar.css";

import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container } from "react-bootstrap";

import icon from "../images/icon.png"
import { ImmoRentaLogo } from "../components/ImmoRentaLogo"

export default function TopNavbar() {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [isDarkMode, setIsDarkMode] = React.useState(false)

  return (
    <Container>
      <Navbar className="container" expand="lg" fixed="top">
        <Navbar.Brand href="/">
          <div style={{ width: 20, marginRight: 10 }}>
            <ImmoRentaLogo />
          </div>
          <div>Immo Renta</div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >

          <Nav.Link href="/concepts">Calcul</Nav.Link>

          <Nav.Link href="/gallery">Blog</Nav.Link>

          <Nav.Link href="/about">About</Nav.Link>

          <Nav.Link onClick={() => {
            isDarkMode ?
              document.body.classList.remove("dark") :
              document.body.classList.add("dark")
            setIsDarkMode(!isDarkMode)
          }}>
            {isDarkMode ? (<span style={{ fontSize: '20px' }}>🌙</span>) : (<span style={{ fontSize: '20px' }}>☀️</span>)}
          </Nav.Link>

        </Navbar.Collapse>


      </Navbar>
    </Container>
  );
}
