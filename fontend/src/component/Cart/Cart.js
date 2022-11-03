import React from 'react'
import { Fragment } from 'react'
import "./Cart.css"
import CartItemCard from "./CartItemCard"
import { useSelector, useDispatch } from 'react-redux'
import {Typography} from '@material-ui/core'
import {Link} from "react-router-dom"
import RemoveShoppingCartIcon from "@material-ui/icons/RemoveShoppingCart"
import { addItemsToCart, removeItemsFromCart } from '../../actions/cartAction'
const Cart = () => {
    const dispatch = useDispatch();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuatity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty))
    };
    const decreaseQuatity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        dispatch(addItemsToCart(id, newQty))
    };

    const deleteCartItems = (id) => {
        dispatch(removeItemsFromCart(id));
    };
    return (
        <Fragment>
            {cartItems.length === 0 ? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                        
                    <Typography>No Product in Your Cart</Typography>
                    <Link to="/products">View Products</Link>
                </div>
            ) : (
                <Fragment>
                    <div className="cartPage">
                        <div className="cartHeader">
                            <p>Product</p>
                            <p>Quantity</p>
                            <p>Subtotal</p>
                        </div>
                        {cartItems && cartItems.map((item) => (
                            <div className="cartContainer" key={item.product}>
                                <CartItemCard item={item} deleteCartItems={deleteCartItems} />
                                <div className="cartInput">
                                    <button onClick={() => decreaseQuatity(item.product, item.quantity)}>-</button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button onClick={() => increaseQuatity(item.product, item.quantity, item.stock)}>+</button>
                                </div>
                                <p className="cartSubtotal">{`${item.price * item.quantity} đ`}</p>
                            </div>
                        ))}
                        <div className="cartGrossProfit">
                            <div></div>
                            <div className="cartGrossProfitBox">
                                <p>Tổng cộng</p>
                                <p style={{color:"red"}}>{`${cartItems.reduce((acc, item)=> acc + item.quantity * item.price,0)} đ`}</p>
                            </div>
                            <div></div>
                            <div className="checkOutBtn">
                                <button>Check Out</button>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    )
}

export default Cart