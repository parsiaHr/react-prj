import { useContext } from "react";
import { Modal } from "./UI/Modal";
import CartContext, { CartContextProvider } from "../store/cartContex";
import { currencyFormatter } from "../util/formatting";
import { Button } from "./UI/Button";
import UserProgressContext from "../store/UserProgressContext";
import CartItem from "./UI/CartItem";

const Cart = () => {
  const { items, addItem, removeItem } = useContext(CartContext);
  const cartTotal = items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0);
  const userProgressCtx = useContext(UserProgressContext);

  function handleCloseCart() {
    userProgressCtx.hideCart();
  }

  function handleGoToCheckout() {
      userProgressCtx.showCheckout();
  }

  return (
    <Modal onClose={userProgressCtx.progress === 'cart' ? handleCloseCart : null} className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>your cart</h2>
      {!items.length && (<h1 style={{color:"black"}}>There is no order in here :((</h1>)}
      <ul style={{ listStyle: "none", padding: "10px" }}>
        {items &&
          items.map((item) => (
            <CartItem
              key={item.id}
              {...item}
              onDecrease={() => removeItem(item.id)}
              onIncrease={() => addItem(item)}
            />
          ))}
      </ul>
      <p className="cart-total">{currencyFormatter.format(cartTotal)}</p>
      <p className="modal-actions">
        <Button onClick={handleCloseCart} textOnly>
          Close
        </Button>
        {items.length > 0 && (
          <Button onClick={handleGoToCheckout} className="">
            Go Checkout
          </Button>
        )}
      </p>
    </Modal>
  );
};

export default Cart;
