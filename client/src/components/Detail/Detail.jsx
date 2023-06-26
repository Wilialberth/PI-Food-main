import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { recipesId, cleanDetail } from "../../redux/actions";
import { useParams } from "react-router-dom";
import style from "./Detail.module.css"

export default function Detail(){

    const dispatch = useDispatch();
    const recipes = useSelector(state => state.recipesDietsId)
    const { id } = useParams();

    useEffect(() => {
        dispatch(recipesId(id))
        return () => dispatch(cleanDetail())
    }, [id, dispatch])

    const diets = recipes.diets ? recipes.diets.join(", ") : ""

    if (!recipes.name) {
        return <div className={style.loading}>Loading...</div>; 
      }

    return(
        <div className={style.container}>
            <h2 className={style.name}>Name: {recipes.name}</h2>
            <img src={recipes.image} alt='' className={style.image}/>
            <h2 className={style.name}>Summary: {recipes.summary}</h2>
            <h2 className={style.name}>HealthScore: {recipes.healthScore}</h2>
            <h2 className={style.name}>Steps: {recipes.steps}</h2>
            <h2 className={style.name}>Diets: {diets}</h2>
        </div>
    )
}