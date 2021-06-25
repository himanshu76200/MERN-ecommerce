import React, { useState, useEffect } from 'react'
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import axios from "axios"

const HomeScreen = () => {
    const [products, setProducts] = useState([])

    useEffect(() => {
        const fetchProducts = async () => {
            const res = await axios.get("/api/products")
            console.log(res)
            setProducts(res.data)
        }
        fetchProducts()
    }, [])

    return (
        <div>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col sm={12} md={6} lg={4} xl={3}>
                        <Product key={product._id} product={product} />
                    </Col>
                ))}
            </Row>
        </div>
    )
}

export default HomeScreen
