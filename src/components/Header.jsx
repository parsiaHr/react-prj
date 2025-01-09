import headerLogo from "../assets/logo.jpg";
import { Button } from "./UI/Button";
import { useContext } from "react";
import cartContext from "../store/cartContex";
import UserProgressContext from "../store/UserProgressContext";

const Header = () => {
  const userProgressCtx = useContext(UserProgressContext);
  const { items } = useContext(cartContext);
  const totalCartItems = items.reduce((totalItemNumbers, item) => {
    return totalItemNumbers + item.quantity;
  }, 0);

  function handleShowCart() {
    userProgressCtx.showCart();
  }

  return (
    <header id="main-header">
      <div id="title">
        <img src={headerLogo} alt="" />
        <h1>React food order app</h1>
      </div>
      <nav>
        <Button onClick={handleShowCart} textOnly>
          Cart ({totalCartItems})
        </Button>
      </nav>
    </header>
  );
};

export default Header;
