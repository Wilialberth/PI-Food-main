import {ALL_RECIPES, RECIPES_ID, RECIPES_NAME, CREATE_RECIPES, DIETS, FILTER_API, FILTER_DB, ORDER, CLEAN_DETAIL} from "./action-types"
import axios from "axios";


export const allRecipes = () => {
    //const endpoint = '/recipes';
    return async (dispatch) => {
        const {data} = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: ALL_RECIPES,
            payload: data
        })
    }
}


export const recipesId = (id) => {
    //const endpoint = `/recipes/${id}`;
    return async (dispatch) => {
        const {data} = await axios.get(`http://localhost:3001/recipes/${id}`);
        return dispatch({
            type: RECIPES_ID,
            payload: data
        })
    }
}


export const recipesName = (name) => {
    //const endpoint = `/recipesName?name=${name}`;
    return async (dispatch) => {
        const {data} = await axios.get(`http://localhost:3001/recipesName?name=${name}`);
        return dispatch({
            type: RECIPES_NAME,
            payload: data
        })
    }
}


export const createRecipes = (create) => {
    //const endpoint = '/recipes';
    return async (dispatch) => {
        const {data} = await axios.post('http://localhost:3001/recipes'  , create);
        return dispatch({
            type: CREATE_RECIPES,
            payload: data
        })
    }
}


export const dietsAll = () => {
    //const endpoint = '/diets'; // quito `/diets` y pongo '/diets'
    return async (dispatch) => {
        const {data} = await axios.get('http://localhost:3001/diets');
        return dispatch({
            type: DIETS,
            payload: data
        })
    }
}


export const filterRecipes = (value) => {
    return {type: FILTER_API, payload: value}
}

export const filterRecipesDb = (value) => {
    return {type: FILTER_DB, payload: value}
}

export const orderRecipes = (value) => {
    return {type: ORDER, payload: value}
}


export const cleanDetail = () => {

    return {type: CLEAN_DETAIL}

}