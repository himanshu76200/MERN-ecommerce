import React, { useEffect } from 'react'
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/Message"
import CheckoutSteps from "../components/CheckoutSteps"
import { Link } from 'react-router-dom'
import { createOrder } from "../actions/orderActions"
import { useHistory } from "react-router-dom"

const PlaceOrderScreeen = () => {
    const cart = useSelector((state => state.cart))
    const dispatch = useDispatch()
    const history = useHistory()

    // Calculate Prices
    cart.itemsPrice = cart.cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity, 0
    )
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 10;
    cart.taxPrice = Number((0.18 * cart.itemsPrice).toFixed(2))
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;

    const orderCreate = useSelector(state => state.orderCreate);
    const { order, success, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history, success])

    const placeOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address</strong>: {" "}
                                {cart.shippingAddress.address}, {cart.shippingAddress.city} {" "}
                                {cart.shippingAddress.postalCode}, {" "}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong> {" "}
                                {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your Cart is empty</Message> : (
                                <ListGroup variant="flush">
                                    {cart.cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={3}>
                                                    <Image src={item.image} alt={item.name}
                                                        fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.quantity} X ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Items
                                    </Col>
                                    <Col>${cart.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Shipping
                                    </Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Tax
                                    </Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Total
                                    </Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message variant="danger">{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type="button" className="btn-block"
                                    disabled={cart.cartItems === 0}
                                    onClick={placeOrderHandler}
                                >
                                    Place Order
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreeen