import React, { useState, useEffect } from 'react'
import { Link, useLocation, useHistory } from "react-router-dom"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { register } from "../actions/userActions"
import FormContainer from '../components/FormContainer'

const RegisterScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null)

    const location = useLocation()
    const history = useHistory();

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()

    const { loading, userInfo, error } = useSelector((state => state.userRegister))

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, redirect, userInfo])

    const submitHandler = (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Password don't match")
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="email">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type="name"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}>
                    </Form.Control>
                </Form.Group>

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

                <Form.Group controlId="password" style={{ marginTop: '10px' }}>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}>
                    </Form.Control>
                </Form.Group>

                <Button type="submit" variant="primary" style={{ marginTop: '10px' }}>
                    Register
                </Button>
            </Form>
            <Row className="py-3" >
                <Col>
                    Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : '/register'}>Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
