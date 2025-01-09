import { useContext } from "react";
import { currencyFormatter } from "../util/formatting";
import { Button } from "./UI/Button";
import cartContext from "../store/cartContex";


const MealItem = ({meal}) => {

  const {addItem , removeItem , items} = useContext(cartContext);

  
  const handleAddMealToCart = () => {
      addItem(meal)
  }
  return (
    <li className="meal-item">
        <article>
            <img src={`http://localhost:3000/${meal.image}`} alt="" />
            <div>
                <h3>{meal.name}</h3>
                <p className="meal-item-price">
                {currencyFormatter.format(meal.price)}
                </p>
                <p>{meal.description}</p>
            </div>
            <p className="meal-item-actions">
                <Button onClick={handleAddMealToCart}>Add to cart</Button>
            </p>
        </article>
    </li>
  )
}

export default MealItem