import {ALL_RECIPES, RECIPES_ID, RECIPES_NAME, CREATE_RECIPES, DIETS, FILTER_API, FILTER_DB, ORDER, CLEAN_DETAIL} from "./action-types"

const initialState = {
    recipesDiets: [],
    recipesDietsId: {},
    recipesDietsName: [],
    recipesDietsFilter: [],
    recipesDietsFilterDb: [],
    dietsRecipes: [],
    createRecipesDiet: []
}

const reducer = (state = initialState, {type, payload}) => {

    switch(type){

        case ALL_RECIPES:
            return {
                ...state,
                recipesDiets: payload
            }

        case RECIPES_ID:
            return {
                ...state,
                recipesDietsId: payload
            }
        
        case RECIPES_NAME:
            return {
                ...state,
                recipesDietsName: payload
            }

        case FILTER_API:
            const allRecipesFiltered = state.recipesDiets.filter(recipe => {
              if (payload === "allRecipes") {
                return true; 
              } else {
                return recipe.diets.includes(payload) && recipe.api === true; 
              }
            });
            return {
              ...state,
              recipesDietsFilter: allRecipesFiltered
            };

            case FILTER_DB:
                const allRecipesFilteredDb = state.recipesDiets.filter(recipe => {
                  if (payload === "allRecipes") {
                    return true; 
                  } else {
                    return recipe.diets.includes(payload) && recipe.db === true; 
                  }
                });
                return {
                  ...state,
                  recipesDietsFilterDb: allRecipesFilteredDb
            };  
    
        case ORDER:
            const allRecipesCopy = [...state.recipesDiets];
            let sortedRecipes;
              
            if (payload === "AH") {
                sortedRecipes = allRecipesCopy.sort((a, b) => a.healthScore - b.healthScore);
            }else if (payload === "AN") {
                sortedRecipes = allRecipesCopy.sort((a, b) => a.name.localeCompare(b.name));
            }else if (payload === "DN") {
                sortedRecipes = allRecipesCopy.sort((a, b) => b.name.localeCompare(a.name)); 
            }else {
                sortedRecipes = allRecipesCopy.sort((a, b) => b.healthScore - a.healthScore);
            }
              
            return {
                ...state,
                recipesDiets: sortedRecipes
            };

        case DIETS:
            return {
                ...state,
                dietsRecipes: payload
            }

        case CREATE_RECIPES:
            return {
                ...state,
                createRecipesDiet: payload
            }

        case CLEAN_DETAIL:
            return{
                ...state,
                recipesDietsId: {}
            }
        
        default:
            return{
                ...state
            }
    }
}

export default reducer