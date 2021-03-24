import "./topNavbar.css";

import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Container } from "react-bootstrap";

import icon from "../images/icon.png"

export default function TopNavbar() {
  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Container>
      <Navbar className="container" expand="lg" fixed="top">
        <Navbar.Brand href="/"><img src={icon} alt="Matplotlib logo" style={{ width: '25px', marginRight: "8px" }} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >

          <Nav.Link href="/concepts">Calcul</Nav.Link>

          <Nav.Link href="/gallery">Blog</Nav.Link>

          <Nav.Link href="/about">About</Nav.Link>

        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
}
