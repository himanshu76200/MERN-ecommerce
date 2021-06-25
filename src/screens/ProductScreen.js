import React, { useState, useEffect } from 'react'
import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Button } from "react-bootstrap"
import Rating from "../components/Rating"
import axios from "axios"
// import products from "../products"

const ProductScreen = () => {
    const [product, setProduct] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get(`/api/product/${id}`);
            setProduct(res.data)
        }
        fetchProducts()
    }, [])

    return (
        <div>
            <Link className="btn btn- my-3" to="/">
                Go Back
            </Link>
            <Row>
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
                        <ListGroup.Item>
                            <Button className="btn-block" type="button" disabled={product.countInStock === 0}>
                                Add to Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>

        </div>
    )
}

export default ProductScreen
