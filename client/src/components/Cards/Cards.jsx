import Card from "../Card/Card"
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { allRecipes} from "../../redux/actions";
import style from "./Cards.module.css"

export default function Cards() {
    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipesDiets)
    useEffect(() => {
      dispatch(allRecipes())
    }, [dispatch])
   return (
      <div className={style.cards}>
         {
            recipes.map(({id, name, image, summary, healthScore, steps, diets}) => {
               return (
                  <Card
                     key={id}
                     id={id}
                     name={name}
                     image={image}
                     summary={summary}
                     healthScore={healthScore}
                     steps={steps}
                     diets={diets.join(", ")}
                  />
               )
            })
         }
      </div>
   );
}