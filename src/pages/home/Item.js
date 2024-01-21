import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const Item = ({product,handleAddToCart,carts}) => {
    let star = parseFloat(product.rating.rate);
    const showStar = () => {
        let starArr = [];
        let flag = true;
        for(let i = 1;i<=5;i++){
            if(i<=star){
                starArr.push(<i className="fa fa-star"></i>);
            }else{
                if(flag){
                    starArr.push(<i className="fas fa-star-half-alt"></i>);
                    flag = false;
                }else{
                    starArr.push(<i className="far fa-star"></i>);
                }
            }
        }
        return starArr;
    }
    let isAlreadyCart = carts.length > 0 && carts.includes(product.id);
    return (
        <Col md={4}>
            <Card className="shadow-0 border rounded-3">
                <Card.Header>
                    <div className="bg-image hover-zoom ripple rounded ripple-surface me-md-3 mb-3 mb-md-0">
                        <img src={product.image} className="w-100 img-hight"  alt="product-image" />
                        <a href="javascript:void(0 )">
                            <div className="hover-overlay">
                                <div className="mask" style={{backgroundColor: "rgba(253, 253, 253, 0.15)"}}></div>
                            </div>
                        </a>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Row className="g-0">
                        <Col>
                            <h5>{product.title}</h5>
                            <div className="d-flex flex-row">
                                <div className="text-warning mb-1 me-2">
                                    {showStar()}
                                    <span className="ms-1">{star}</span>
                                </div>
                                <span className="text-muted d-flex align-items-stretch ">{product.rating.count}</span>
                            </div>
                            {/* <p className="text mb-4 mb-md-0">
                                {product.description}
                            </p> */}
                            <Col xl={4} md={4} sm={4}>
                                <div className="d-flex flex-row align-items-center mb-1">
                                    <h4 className="mb-1 me-1">${product.price}</h4>
                                </div>
                            </Col>
                        </Col>
                    </Row>
                    <div className="mt-4 text-center">
                        <Button 
                            variant="primary" 
                            type="button" 
                            onClick={()=>handleAddToCart(product.id)} 
                            className="shadow-0"
                            disabled={isAlreadyCart}
                        >
                            {isAlreadyCart ?'Added to Cart':'Add To Cart'}
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default Item;