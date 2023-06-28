import { createRecipes, allRecipes } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import validateRecipes from "../Validation/ValidationRecipes";
import style from "./CreateRecipe.module.css"

const CreateRecipe = () => {

    const dispatch = useDispatch();

    const recipes = useSelector(state => state.recipesDiets)

    const [formData, setFormData] = useState({
        name: "",
        image: "",
        summary: "",
        healthScore: "",
        steps: "",
        diets: ""
    });

    const [shouldCreate, setShouldCreate] = useState(false); //si lo establezco inicialmente en true, significa que se intentará crear automáticamente una receta cuando se cargue el componente.
    const [errors, setErrors] = useState({});
    const [createSuccess, setCreateSuccess] = useState(false);//Al establecerlo inicialmente en false, el mensaje de éxito no se mostrará de forma predeterminada
    

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({ ...prevState, [name]: value }));

        
      };

      const handleCreate = () => {
        const validationErrors = validateRecipes(recipes, formData);
        const dietsArray = formData.diets.split(",").map((diet) => diet.trim());
        const updatedFormData = { ...formData, diets: dietsArray };
        
        if (Object.keys(validationErrors).length === 0) {
            dispatch(createRecipes(updatedFormData));
            setShouldCreate(true);
            setCreateSuccess(true);
            setFormData({
              name: "",
              image: "",
              summary: "",
              healthScore: "",
              steps: "",
              diets: ""
            });
        }
        setErrors(validationErrors);
      };

    useEffect(() => {
        if (shouldCreate) {
          dispatch(createRecipes());
        }
      }, [shouldCreate, dispatch]);

      useEffect(() => {
        dispatch(allRecipes());
      }, [dispatch]);

      const formValidate = 
      formData.name.length === 0 ||
      formData.image.length === 0 ||
      formData.summary.length === 0 ||
      formData.healthScore.length === 0 ||
      formData.steps.length === 0 ||
      formData.diets.length === 0;

    return(

        <div className={style.container}>
          
            
            <p className={style.name}>Enter the name of the recipe to create</p>
            <label htmlFor="name" className={style.name}>Name: </label>
            <input name="name" type="text" value={formData.name} onChange={handleInputChange} className={style.input}/>
            {errors.name && <p className={style.error}>{errors.name}</p>}
            <hr/>
            <p className={style.name}>Enter the image link</p>
            <label htmlFor="image" className={style.name}>Image: </label>
            <input name="image" type="text" value={formData.image} onChange={handleInputChange} className={style.input}/>
            <hr/>
            <p className={style.name}>Enter a summary for your recipe</p>
            <label htmlFor="summary" className={style.name}>Summary: </label>
            <input name="summary" type="text" value={formData.summary} onChange={handleInputChange} className={style.summary}/>
            <hr/>
            <p className={style.name}>Enter a health score</p>
            <label htmlFor="healthScore" className={style.name}>HealthScore: </label>
            <input name="healthScore" type="number" value={formData.healthScore} onChange={handleInputChange} className={style.score}/>
            <hr/>
            <p className={style.name}>Enter the steps to follow for your recipe</p>
            <label htmlFor="steps" className={style.name}>Steps: </label>
            <input name="steps" type="text" value={formData.steps} onChange={handleInputChange} className={style.input}/>
            <hr/>
            <p className={style.name}>Enter the diets of your recipe (separate each diet with a ",")</p>
            <label htmlFor="diets" className={style.name}>Diets: </label>
            <input name="diets" type="text" value={formData.diets} onChange={handleInputChange} className={style.input}/>
            <hr className={style.line}/>
            <button onClick={handleCreate} disabled={formValidate} className={style.search}>Create</button>
            {createSuccess && <p className={style.error}>Recipe created successfully!</p>}
            {Object.keys(errors).length > 0 && (<p className={style.error}>Failed to create recipe. Please check the form.</p>)}
        </div>
    
    )
}


export default CreateRecipe;