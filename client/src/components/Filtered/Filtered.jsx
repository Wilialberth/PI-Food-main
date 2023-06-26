import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { filterRecipes, orderRecipes, dietsAll, filterRecipesDb, cleanDetail} from "../../redux/actions";
import { useNavigate, useLocation } from "react-router-dom";
import Card from "../Card/Card";
import style from "./Filtered.module.css"


const Filtered = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const recipesDb = useSelector(state => state.recipesDietsFilterDb)
    const recipes = useSelector(state => state.recipesDietsFilter)
    const recipesOrder = useSelector(state => state.recipesDiets)
    const filterDiets = useSelector(state => state.dietsRecipes)

    useEffect(() => {
        dispatch(filterRecipes());
        dispatch(filterRecipesDb())
        dispatch(orderRecipes());
        dispatch(dietsAll());
        return () => dispatch(cleanDetail())
      }, [dispatch]);

    const handleFiltered = (event) => {
        dispatch(cleanDetail());
        dispatch(filterRecipes(event.target.value))
        navigate("/home/filter")
    };

    const handleFilteredDb = (event) => {
        dispatch(cleanDetail());
        dispatch(filterRecipesDb(event.target.value))
        navigate("/home/filterDb")
    };

    const handleOrder = (event) => {
        dispatch(cleanDetail());
        dispatch(orderRecipes(event.target.value))
        navigate("/home/order")
    }

    const dietsApi = filterDiets.filter(diet => diet.diet);
    const dietsDb = filterDiets.filter(diet => diet.name)

    return(

        <>
            <div className={style.container}>
            <select onChange={handleOrder} className={style.search}>
            <option hidden>Order</option>
            <option disabled>Order</option>
            <option value="AH">upward(HealthScore)</option>
            <option value="DH">falling(HealthScore)</option>
            <option value="AN">upward(Name)</option>
            <option value="DN">falling(Name)</option>
            </select>

            <select onChange={handleFiltered} className={style.search}>
            <option hidden>Filter Diet API</option>
            <option disabled>Filter Diet API</option>
             {dietsApi.map(({diet, id}) => (
              <option key={id} value={diet}>{diet}</option>
            ))}
            </select>

            <select onChange={handleFilteredDb} className={style.search}>
            <option hidden>Filter Diet BD</option>
            <option disabled>Filter Diet DB</option>
             {dietsDb.map(({name, id}) => (
              <option key={id} value={name}>{name}</option>
            ))}
            </select>
            </div>

            { location.pathname === '/home/filter' && recipes.map(({id, name, image, summary, healthScore, steps, diets}) => {
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

            { location.pathname === '/home/filterDb' && recipesDb.map(({id, name, image, summary, healthScore, steps, diets}) => {
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

            { location.pathname === '/home/order' && recipesOrder.map(({id, name, image, summary, healthScore, steps, diets}) => {
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
        </>
    )
}

export default Filtered