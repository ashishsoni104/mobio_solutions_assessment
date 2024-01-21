import React, { useEffect } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Item from "./Item";
import Layout from "../../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchProducts, setProducts } from "../../redux/product/ProductSlice";

const Home = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const loading = useSelector((state) => state.products.loading);
    const carts = useSelector((state) => state.products.carts);
    useEffect(()=>{
        if(loading==='idle'){
            dispatch(fetchProducts())
        }
    },[loading,dispatch]);
    const handleAddToCart = (productId) => {
        let cartsItem = {...carts};
        cartsItem[productId] = {
            productId:productId,
            quantity:1
        }
        dispatch(addToCart(cartsItem))
    }
    const handleSort = (e) => {
        let value = e.target.value;
        if(value!==""){
            let productData;
            if(value === "low"){
                productData =  products.slice().sort((a,b)=>{
                    return a.price-b.price;
                });
            }else{
                productData =  products.slice().sort((a,b)=>{
                    return b.price-a.price;
                });
            }
            dispatch(setProducts(productData));
        }else{
            dispatch(fetchProducts())
        }
    }
    let cartsKeys = Object.keys(carts);
    cartsKeys = cartsKeys.length > 0 &&  cartsKeys.map(value => eval(value));
    const productCount = products.length;
    return (
        <React.Fragment>
            <Layout 
                showSearch={true}
                isCart={true}
            />
            <div className="bg-primary mb-4">
                <Container className="py-4">
                    <h3 className="text-white">All Products</h3>
                </Container>
            </div>
            <section>
                <Container>
                    <Row>
                        <Col lg={12}>
                            <header className="d-sm-flex align-items-center border-bottom mb-4 pb-3">
                                <strong className="d-block py-2">{productCount} Items found </strong>
                                <div className="ms-auto">
                                    <Form.Select className="d-inline-block w-auto border pt-1" onChange={handleSort}>
                                        <option value="">Sort By Price</option>
                                        <option value="low">Low to High</option>
                                        <option value="high">High to Low</option>
                                    </Form.Select>
                                </div>
                            </header>
                            <Row className="justify-content-center mb-3"> 
                                {products && products.length > 0 && products.map((product)=>{
                                    return (
                                        <Item 
                                            product = {product}  
                                            handleAddToCart={handleAddToCart}
                                            carts={cartsKeys}
                                        />
                                    )
                                })}
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default Home;