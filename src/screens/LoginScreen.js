import React, { useState, useEffect } from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { login } from "../actions/userActions"
import FormContainer from '../components/FormContainer';

const LoginScreen = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const location = useLocation()
    const history = useHistory();

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const { loading, userInfo, error } = useSelector((state => state.userLogin))

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId="password" style={{ marginTop: '10px' }}>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Button type="submit" variant="primary" style={{ marginTop: '10px' }}>
                    Sign In
                </Button>
            </Form>
            <Row className="py-3" >
                <Col>
                    New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
