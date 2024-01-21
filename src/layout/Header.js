import React, { useState } from "react";
import { Button, Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchProducts, setProducts } from "../redux/product/ProductSlice";

const Header = ({showSearch,isCart}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isUserLogin = useSelector(state=>state.auth.isUserLogin);
    const [searchValue,setSearchValue] = useState('');
    const products = useSelector((state) => state.products.products);
    const handleSearch = () => {
        if(searchValue!==""){
            let productData = products.filter(value => value.title.toLowerCase().includes(searchValue.toLowerCase()));
            dispatch(setProducts(productData))
        }else{
            dispatch(fetchProducts())
        }
    }
    return (
        <div className="p-3 text-center bg-white border-bottom">
            <Container>
                <Row className="gy-3">
                    <Col lg={2} sm={4} xs={4}>
                        <Link to="/" className="float-start">
                            <img src="https://mdbootstrap.com/img/logo/mdb-transaprent-noshadows.png" height={35} alt="logo" />
                        </Link>
                    </Col>
                    <Col lg={5} sm={8} xs={8} className="order-lg-last">
                        <div className="d-flex float-end">
                            {isUserLogin ?
                                <button className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center">
                                    <i className="fas fa-user-alt m-1 me-md-2"></i>
                                    <p className="d-none d-md-block mb-0">Logout</p> 
                                </button>
                            :
                                <Link to='/login' className="me-1 border rounded py-1 px-3 nav-link d-flex align-items-center"> 
                                    <i className="fas fa-user-alt m-1 me-md-2"></i>
                                    <p className="d-none d-md-block mb-0">Sign in</p> 
                                </Link>
                            }
                            {isCart &&
                                <Link to="/checkout" className="border rounded py-1 px-3 nav-link d-flex align-items-center"> 
                                    <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                                    <p className="d-none d-md-block mb-0">My cart</p> 
                                </Link>
                            }
                        </div>
                    </Col>
                    <Col lg={5} md={12} xs={12}>
                        {showSearch &&
                            <InputGroup className="float-center">
                                <div className="form-outline">
                                    <Form.Control 
                                        type="search"
                                        id="search"
                                        onChange={(e)=>setSearchValue(e.target.value)}
                                    />
                                    <Form.Label htmlFor="search">Search</Form.Label>
                                </div>
                                <Button variant="primary" className="shadow-0" onClick={handleSearch}>
                                    <i className="fas fa-search"></i>
                                </Button>
                            </InputGroup>
                        }
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Header;