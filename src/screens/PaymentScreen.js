import React, { useState } from "react"
import { Form, Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import FormContainer from "../components/FormContainer"
import { savePaymentMethod } from "../actions/cartActions"
import CheckoutSteps from "../components/CheckoutSteps"

const PaymentScreen = () => {
    const cart = useSelector((state => state.cart))
    const { shippingAddress } = cart

    const history = useHistory()
    const dispatch = useDispatch()

    if (!shippingAddress) {
        history.push("/shipping")
    }

    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeorder")
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3 />
            <h1>Payment Method</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label as="legend">
                        Select Method
                    </Form.Label>
                    <Col>
                        <Form.Check type="radio"
                            label="PayPal or Credit Card"
                            id="PayPal"
                            name="paymentMethod"
                            value="PayPal"
                            checked
                            onChange={(e) => { setPaymentMethod(e.target.value) }}
                        >
                        </Form.Check>
                        {/* <Form.Check type="radio"
                            label="Stripe"
                            id="Stripe"
                            name="paymentMethod"
                            value="Stripe"
                            checked
                            onChange={(e) => { setPaymentMethod(e.target.value) }}
                        >
                        </Form.Check> */}
                    </Col>
                </Form.Group>
                <Button type="submit" variant="primary" style={{ marginTop: '10px' }}>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentScreen
