import {ALL_RECIPES, RECIPES_ID, RECIPES_NAME, CREATE_RECIPES, DIETS, FILTER_API, FILTER_DB, ORDER, CLEAN_DETAIL} from "./action-types"
import axios from "axios";


export const allRecipes = () => {
    //const endpoint = '/recipes';
    return async (dispatch) => {
        const {data} = await axios.get('http://localhost:3001/recipes');
        return dispatch({
            type: ALL_RECIPES, // propiedad que describe lo que quiero que haga.
            payload: data // info adicional que le envío al reducer para que sepa lo que tiene que hacer.
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
//es un obj describiendo lo que pasó.
//Actions son un bloque de información que envia datos desde mi aplicación a mi store. 
//Son la única fuente de información para el store. 
//Las enviamos al store usando dispatch().
//Nos dicen que algo pasó pero no específica cómo cambio el estado de la app en respues ya que ese es trabajo de los reducers.
//Representan los hechos sobre "lo que pasó".