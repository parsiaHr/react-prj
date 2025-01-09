import React, { useContext } from 'react'
import { Modal } from './UI/Modal'
import CartContext from '../store/cartContex'
import { currencyFormatter } from '../util/formatting';
import Input from './UI/Input';
import { Button } from './UI/Button';
import UserProgressContext from '../store/UserProgressContext';

const Checkout = () => {
    const cartCtx = useContext(CartContext);
    const userProgressCtx =  useContext(UserProgressContext)

    const cartTotal = cartCtx.items.reduce((totalPrice , item) => {
        return totalPrice + item.quantity * item.price
    } , 0);

    function handleClose() {
        // userProgressCtx.hideCheckout()
        userProgressCtx.showCart();
    }

    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());

        fetch("http://localhost:3000/orders" , {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                order:{
                    items: cartCtx.items,
                    customer:customerData
                }
            })
        })
    }


  return (
    <Modal open={userProgressCtx.progress === 'checkout'}>
        <form onSubmit={handleSubmit}>
            <h2>Checkout</h2>
            <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
            <Input label="Full Name" id="name" type="text" />
            <Input label="Email Address" id="email" type="email" />
            <Input label="ُStreet Address" id="text" type="street" />
            <div className='control-row'>
                <Input label="Postal Code" type="text" id="postal-code" />    
                <Input label="City" type="text" id="city" />    
            </div>
            <p className='modal-actions'>
                <Button type="button" textOnly onClick={handleClose}>
                    Back to Cart
                </Button>
                <Button>
                    submit
                </Button>
            </p>
        </form>
    </Modal>
  )
}

export default Checkout