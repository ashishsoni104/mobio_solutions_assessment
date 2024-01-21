import React, { useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Layout from "../../layout/Layout";
import { useDispatch, useSelector } from "react-redux";
import { blankCart, fetchProducts } from "../../redux/product/ProductSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { blankRegisterResponse, registerUser } from "../../redux/auth/AuthSlice";
import { useNavigate } from "react-router-dom";

const PlaceMyOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state.products.products);
    const carts = useSelector((state) => state.products.carts);
    const loading = useSelector((state) => state.products.loading);
    const registerResponse = useSelector((state)=>state.auth.registerUserResponse);
    useEffect(()=>{
        if(loading==='idle'){
            dispatch(fetchProducts())
        }
    },[loading,dispatch]);
    useEffect(()=>{
        if(registerResponse && Object.keys(registerResponse).length > 0){
            dispatch(blankRegisterResponse());
            dispatch(blankCart());
            alert("User Register Successfully");
            navigate("/");
        }
    },[registerResponse]);
    let cartsKeys = Object.keys(carts);
    cartsKeys = cartsKeys.length > 0 &&  cartsKeys.map(value => eval(value));
    const cartsItem = cartsKeys.length>0 && products.filter(product => cartsKeys.includes(product.id));
    let totalCartSum = cartsItem && cartsItem.length > 0 && cartsItem.reduce((a,b)=>{
        let count = carts[b.id].quantity;
        let price = count*b.price;
        return a + price;
    },0)
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            firstname:"",
            lastname:"",
            email:"",
            mobile:"",
            city:"",
            street:"",
            zipcode:"",
            register_user:false,
            password:""
        },
        validationSchema:Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            firstname: Yup.string().max(255).required("First Name is required"),
            lastname: Yup.string().max(255).required("Last Name is required"),
            mobile:Yup.string().max(255).required("Mobile No. is required"),
            city:Yup.string().max(255).required("City is required"),
            street:Yup.string().max(255).required("Street is required"),
            zipcode:Yup.string().max(255).required("Zipcode is required"),
            // password: Yup.string().nullable().when('register_user',{
            //     is:(register_user) => register_user, 
            //     then: Yup.string().max(255).required("Password is required")
            // }).transform((v, o) => (o === "" ? null : v))
        }),
        onSubmit: values => {
            if(values.register_user){
                let data = {
                    email:values.email,
                    username:values.email,
                    password:values.password,
                    name:{
                        firstname:values.firstname,
                        lastname:values.lastname
                    },
                    address:{
                        city:values.city,
                        street:values.street,
                        number:3,
                        zipcode:values.zipcode,
                        geolocation:{}
                    },
                    phone:values.mobile
                }
                dispatch(registerUser(data))
            }else{
                navigate("/");
            }
        }
    })
    return (
        <React.Fragment>
            <Layout 
                showSearch={false}
                isCart={false}
            />
            <section className="h-100 h-custom">
                <Container className="h-100 py-5">
                    <Row>
                        <Col md={8} className="mb-4">
                            <Card className="mb-4">
                                <Card.Header className="py-3">
                                    <h5 className="mb-0">Billing Details</h5>
                                </Card.Header>
                                <Card.Body>
                                    <Form> 
                                        <Row className="mb-4">
                                            <Col>
                                                <div className="form-outline">
                                                    <Form.Control 
                                                        type="text"
                                                        id="firstname"
                                                        name="firstname"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.firstname}
                                                        isInvalid={Boolean(formik.touched.firstname && formik.errors.firstname)}
                                                    />
                                                    <Form.Label 
                                                        htmlFor="firstname"
                                                    >First Name</Form.Label>
                                                     {!!formik.touched.firstname && (
                                                        <Form.Control.Feedback type="invalid">
                                                            {formik.errors.firstname}
                                                        </Form.Control.Feedback>
                                                    )}
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="form-outline">
                                                    <Form.Control 
                                                        type="text"
                                                        id="lastname"
                                                        name="lastname"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.lastname}
                                                        isInvalid={Boolean(formik.touched.lastname && formik.errors.lastname)}
                                                    />
                                                    <Form.Label 
                                                        htmlFor="lastname"
                                                    >Last Name</Form.Label>
                                                    {!!formik.touched.lastname && (
                                                        <Form.Control.Feedback type="invalid">
                                                            {formik.errors.lastname}
                                                        </Form.Control.Feedback>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>

                                        <div className="form-outline mb-4">
                                            <Form.Control 
                                                type="text"
                                                id="email"
                                                name="email"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.email}
                                                isInvalid={Boolean(formik.touched.email && formik.errors.email)}
                                            />
                                            <Form.Label 
                                                htmlFor="email"
                                            >Email</Form.Label>
                                            {!!formik.touched.email && (
                                                <Form.Control.Feedback type="invalid">
                                                    {formik.errors.email}
                                                </Form.Control.Feedback>
                                            )}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <Form.Control 
                                                type="text"
                                                id="mobile"
                                                name="mobile"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                value={formik.values.mobile}
                                                isInvalid={Boolean(formik.touched.mobile && formik.errors.mobile)}
                                            />
                                            <Form.Label 
                                                htmlFor="mobile"
                                            >Mobile</Form.Label>
                                            {!!formik.touched.mobile && (
                                                <Form.Control.Feedback type="invalid">
                                                    {formik.errors.mobile}
                                                </Form.Control.Feedback>
                                            )}
                                        </div>

                                        <Row className="mb-4">
                                            <Col>
                                                <div className="form-outline">
                                                    <Form.Control 
                                                        type="text"
                                                        name="city"
                                                        id="city"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.city}
                                                        isInvalid={Boolean(formik.touched.city && formik.errors.city)}
                                                    />
                                                    <Form.Label 
                                                        htmlFor="city"
                                                    >City</Form.Label>
                                                    {!!formik.touched.city && (
                                                        <Form.Control.Feedback type="invalid">
                                                            {formik.errors.city}
                                                        </Form.Control.Feedback>
                                                    )}
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="form-outline">
                                                    <Form.Control 
                                                        type="text"
                                                        name="street"
                                                        id="street"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.street}
                                                        isInvalid={Boolean(formik.touched.street && formik.errors.street)}
                                                    />
                                                    <Form.Label 
                                                        htmlFor="street"
                                                    >Street</Form.Label>
                                                    {!!formik.touched.street && (
                                                        <Form.Control.Feedback type="invalid">
                                                            {formik.errors.street}
                                                        </Form.Control.Feedback>
                                                    )}
                                                </div>
                                            </Col>
                                            <Col>
                                                <div className="form-outline">
                                                    <Form.Control 
                                                        type="text"
                                                        name="zipcode"
                                                        id="zipcode"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        value={formik.values.zipcode}
                                                        isInvalid={Boolean(formik.touched.zipcode && formik.errors.zipcode)}
                                                    />
                                                    <Form.Label 
                                                        htmlFor="zipcode"
                                                    >Zip Code</Form.Label>
                                                    {!!formik.touched.zipcode && (
                                                        <Form.Control.Feedback type="invalid">
                                                            {formik.errors.zipcode}
                                                        </Form.Control.Feedback>
                                                    )}
                                                </div>
                                            </Col>
                                        </Row>
                                        {formik.values.register_user && 
                                            <div className="form-outline d-flex justify-content-center mb-2">
                                                <Form.Control 
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                    value={formik.values.password}
                                                    isInvalid={Boolean(formik.touched.password && formik.errors.password)}
                                                />
                                                <Form.Label 
                                                    htmlFor="password"
                                                >Password</Form.Label>
                                                 {!!formik.touched.password && (
                                                    <Form.Control.Feedback type="invalid">
                                                        {formik.errors.password}
                                                    </Form.Control.Feedback>
                                                )}
                                            </div>
                                        }
                                        <div className="form-check d-flex justify-content-center mb-2">
                                            <Form.Check 
                                                type="checkbox"
                                                className="me-2"
                                                id="register_user"
                                                name="register_user"
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                                checked={formik.values.register_user}
                                            />
                                            <Form.Label htmlFor="register_user">
                                                Create an account?
                                            </Form.Label>
                                        </div>
                                        
                                    </Form>
                                </Card.Body>
                            </Card>
                        </Col>
                        <Col md={4} className="mb-4">
                            <Card className="mb-4">
                                <Card.Header className="py-3">
                                    <h5 className="mb-0">Summary</h5>
                                </Card.Header>
                                <Card.Body>
                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 pb-0">
                                            Products <span>${parseInt(totalCartSum)+2}</span>
                                        </li>
                                        <li className="list-group-item d-flex justify-content-between align-items-center border-0 px-0 mb-3">
                                            <div>
                                                <strong>Total amount</strong>
                                                <strong>
                                                    <p className="mb-0">(including Tax)</p>
                                                </strong>
                                            </div>
                                            <span><strong>${parseInt(totalCartSum)+2}</strong></span>
                                        </li>
                                    </ul>
                                    <Button variant="primary" onClick={formik.handleSubmit} type="button" className="btn-block" size="lg">
                                        Make purchase
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default PlaceMyOrder;