import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row, Table } from "react-bootstrap";
import Item from "./Item";
import Layout from "../../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, updateCartsDecrement, updateCartsIncrement } from "../../redux/product/ProductSlice";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);
    const carts = useSelector((state) => state.products.carts);
    const loading = useSelector((state) => state.products.loading);
    useEffect(()=>{
        if(loading==='idle'){
            dispatch(fetchProducts())
        }
    },[loading,dispatch]);
    let cartsKeys = Object.keys(carts);
    cartsKeys = cartsKeys.length > 0 &&  cartsKeys.map(value => eval(value));
    const cartsItem = cartsKeys.length>0 && products.filter(product => cartsKeys.includes(product.id));
    let totalCartSum = cartsItem && cartsItem.length > 0 && cartsItem.reduce((a,b)=>{
        let count = carts[b.id].quantity;
        let price = count*b.price;
        return a + price;
    },0)
    
    
    const handleChangeQty = (type,productId) => {
        let cartsItemData = {...carts};
        let cartProduct = cartsItemData[productId];
        if(type === "minus"){
            dispatch(updateCartsDecrement(cartProduct))
        }else{
            dispatch(updateCartsIncrement(cartProduct))
        }
    }

    const totalWithShipping = (totalCartSum) => {
        return parseInt(totalCartSum) + parseInt(2);
    }

    const goToPlaceMyOrder = () => {
        navigate('/placeorder');
    }
    
    return (
        <React.Fragment>
            <Layout 
                showSearch={false}
                isCart={false}
            />
            <section className="h-100 h-custom">
                <Container className="h-100 py-5">
                    <Row className="d-flex justify-content-center align-items-center h-100">
                        <Col>
                            <Table responsive>
                                <thead>
                                    <tr>
                                        <th scope="col" class="h5">Shopping Bag</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cartsItem  && cartsItem.length>0 ?
                                    <>
                                    { cartsItem.map(product=>{
                                        return (
                                            <Item product={product} carts={carts} handleChangeQty={handleChangeQty} />
                                        )
                                    })}
                                    </>
                                    :  <tr>
                                            <td colSpan={3}>No Cart Items Found</td>
                                        </tr>}
                                </tbody>
                            </Table>
                            {cartsItem  && cartsItem.length>0 ?
                            <Card className="shadow-2-strong mb-5 mb-lg-0">
                                <Card.Body>
                                    <Row>
                                        <Col md={6} lg={4} xl={3} className="mb-4 mb-md-0">
                                            <Form>
                                                <div className="d-flex flex-row pb-3">
                                                    <div className="d-flex align-items-center pe-2">
                                                        <Form.Check 
                                                            type="radio"
                                                            name="caseondevelivery"
                                                            id="caseondevelivery"
                                                            value="" 
                                                            ariaLabel="..." 
                                                            checked
                                                        />
                                                        <div className="rounded border w-100 p-3">
                                                            <p className="d-flex align-items-center mb-0">
                                                                <i className="fab fa-cc-mastercard fa-2x text-dark pe-2"></i>Cash On delivery
                                                            </p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </Form>
                                        </Col>
                                        <Col md={6} lg={4} xl={3}>
                                            <div className="d-flex justify-content-between" style={{fontWeight: "500"}}>
                                                <p className="mb-2">Subtotal</p>
                                                <p className="mb-2">${totalCartSum.toFixed(2)}</p>
                                            </div>

                                            <div className="d-flex justify-content-between" style={{fontWeight: "500"}}>
                                                <p className="mb-0">Shipping</p>
                                                <p className="mb-0">$2.00</p>
                                            </div>

                                            <hr className="my-4" />

                                            <div className="d-flex justify-content-between mb-4" style={{fontWeight: "500"}}>
                                                <p className="mb-2">Total (tax included)</p>
                                                <p className="mb-2">${ totalWithShipping(totalCartSum) }</p>
                                            </div>

                                            <Button onClick={goToPlaceMyOrder} variant="primary" className="btn-block" size="lg">
                                                <div className="d-flex justify-content-between">
                                                    <span>Checkout</span>
                                                    <span>${totalWithShipping(totalCartSum) }</span>
                                                </div>
                                            </Button>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                            :null}
                        </Col>
                    </Row>
                </Container>  
            </section>
        </React.Fragment>
    )
}

export default Checkout;