import useHttp from "../../hooks/useHttp";
import MealItem from "./MealItem";
const requestConfig = {};

const Meals = () => {

    const {data:meals , isLoading , error} = useHttp("http://localhost:3000/meals" , requestConfig , [])

    console.log(meals)

    if(isLoading) {
        return <p className="center">Fetching data from data basem please wait...</p>
    }
    
  return (
    <ul id="meals">
        {
             meals.map((meal) => (
               <MealItem key={meal.id} meal={meal} />
            ))
        }
    </ul>
  )
}

export default Meals