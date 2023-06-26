import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { recipesName, cleanDetail } from "../../redux/actions";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import Card from "../Card/Card";
import Filtered from "../Filtered/Filtered";
import style from "./Nav.module.css"

 const Nav = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const recipes = useSelector(state => state.recipesDietsName)
    const { name } = useParams();
    const location = useLocation();

    useEffect(() => {
        if(name){
        dispatch(recipesName(name))
    }
        return () => dispatch(cleanDetail())
    }, [dispatch, name])

    const handleSearch = (searchQuery) => {
        dispatch(recipesName(searchQuery))
        navigate("/home/search")
    };

    const handleHome = () => {
        dispatch(cleanDetail());
        navigate("/home");
    };

    const handleLogin = () => {
        dispatch(cleanDetail());
        navigate("/");
    }
    const handlecreateRecipe = () => {
        dispatch(cleanDetail());
        navigate("/home/createRecipe");
    }

    return(
        <div>
            <SearchBar onSearch={handleSearch}/>
            <div className={style.container}>
            <button onClick={handleHome} className={style.button}>Home</button>
            <button onClick={handleLogin} className={style.button}>Log aut</button>
            <button onClick={handlecreateRecipe} className={style.button}>Create recipe</button>
            </div>
            <Filtered/>

      { location.pathname === '/home/search' && recipes.map(({id, name, image, summary, healthScore, steps, diets}) => {
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
    )
}
export default Nav;