import React, { useState, useEffect } from 'react'
import { Link, useParams, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Image, ListGroup, Button, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import { listProductDetails } from "./../actions/productActions"
import Loader from "../components/Loader"
import Message from '../components/Message'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const ProductScreen = () => {
    const { id } = useParams();

    const history = useHistory();

    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch()

    const { error, product, loading } = useSelector((state => state.productDetails))

    useEffect(() => {
        dispatch(listProductDetails(id))
    }, [dispatch, id])

    const addToCartHandler = () => {
        history.push(`/cart/${id}?qty=${quantity}`)
    }

    return (
        <div>
            <Link to="/">
                <Button className="btn my-3" style={{ backgroundColor: 'red' }}>
                    <ArrowBackIcon /> Go Back
                </Button>
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
                product && <Row>
                    <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>
                    <Col md={6}>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h3>{product.name}</h3>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Rating value={product.rating} text={`${product.numReviews} Reviews`} />
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Price: ${product.price}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                Description: {product.description}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status: {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            {product.countInStock > 0 &&
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            <Form.Control as="select" value={quantity} onChange={(e) => {
                                                setQuantity(e.target.value)
                                            }}>
                                                {
                                                    [...Array(product.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>
                                                            {x + 1}
                                                        </option>
                                                    ))
                                                }
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            }

                            <ListGroup.Item>
                                <Button className="btn-block" type="button" disabled={product.countInStock === 0} onClick={addToCartHandler}>
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>}

        </div>
    )
}

export default ProductScreen
