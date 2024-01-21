import React, { useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, setIsUserLogin } from "../../redux/auth/AuthSlice";
import Layout from "../../layout/Layout";

const Login = () => {
    const dispatch = useDispatch();
    const loginResponse = useSelector(state=>state.auth.loginResponse);
    useEffect(()=>{
        if(loginResponse && Object.keys(loginResponse).length>0){
            if(loginResponse && loginResponse.token){
                window.localStorage.setItem('isLoginUser',1);
                dispatch(setIsUserLogin(true));
                alert("Login success");
            }else{
                alert(loginResponse);
            }            
        }
        // else{
        //     alert("Invaild username and password");
        // }
    },[loginResponse])
    const formik = useFormik({
        enableReinitialize:true,
        initialValues: {
            email:"",
            password:""
        },
        validationSchema:Yup.object().shape({
            email: Yup.string()
              .email("Must be a valid email")
              .max(255)
              .required("Email is required"),
            password:Yup.string().max(255).required("Password is required")
        }),
        onSubmit: values => {
            let data = {
                username:values.email,
                password:values.password
            }
            dispatch(loginUser(data))
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
                        <Col className="align-item-center w-75">
                            <Form onSubmit={formik.handleSubmit}>
                                <div className="form-outline mb-4">
                                    <Form.Control 
                                        type="email"
                                        id="email"
                                        name="email"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        isInvalid={Boolean(formik.touched.email && formik.errors.email)}
                                    />
                                    <Form.Label htmlFor="email">Email</Form.Label>
                                    {!!formik.touched.email && (
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.email}
                                        </Form.Control.Feedback>
                                    )}
                                </div>
                                <div className="form-outline mb-4">
                                    <Form.Control 
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.password}
                                        isInvalid={Boolean(formik.touched.password && formik.errors.password)}
                                    />
                                    <Form.Label htmlFor="password">Password</Form.Label>
                                    {!!formik.touched.password && (
                                        <Form.Control.Feedback type="invalid">
                                            {formik.errors.password}
                                        </Form.Control.Feedback>
                                    )}
                                </div>
                                <Button type="submit" variant="primary" className="btn-block mb-4">Sign In</Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}
export default Login;