import React from 'react'
import { Navbar, Nav, Container } from "react-bootstrap"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PermIdentityOutlinedIcon from '@material-ui/icons/PermIdentityOutlined';

const Header = () => {
    return (
        <header>
            <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                    <Navbar.Brand href="/">ePay</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                            <Nav.Link href="/cart"><ShoppingCartIcon />CART</Nav.Link>
                            <Nav.Link href="/login"><PermIdentityOutlinedIcon />SIGN IN</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;
