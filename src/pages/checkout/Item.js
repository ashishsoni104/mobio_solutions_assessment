import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";

const Item = ({product,carts,handleChangeQty}) => {
    return (
        <tr>
            <th scope="row">
                <div className="d-flex align-items-center">
                    <img src={product.image} className="img-fluid rounded-3" style={{width: "120px"}} alt="Book" />
                    <div className="flex-column ms-4">
                        <p className="mb-2">{product.title}</p>
                        {/* <p className="mb-0">Daniel Kahneman</p> */}
                    </div>
                </div>
            </th>
            <td class="align-middle">
                <div class="d-flex flex-row">
                    <Button 
                        variant="link" 
                        className="px-2"
                        onClick={()=>handleChangeQty('minus',product.id)}
                    >
                        <i className="fas fa-minus"></i>
                    </Button>
                    <Form.Control 
                        type="text"
                        name="quantity"
                        readOnly
                        value={carts[product.id].quantity}
                        style={{width: "50px"}}
                    />
                    <Button 
                        variant="link" 
                        className="px-2"
                        onClick={()=>handleChangeQty('plus',product.id)}
                    >
                        <i className="fas fa-plus"></i>
                    </Button>
                </div>
            </td>
            <td className="align-middle">
                <p className="mb-0" style={{fontWeight: "500"}}>${product.price}</p>
            </td>
        </tr>
    )
}
export default Item;