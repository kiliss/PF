import axios from "axios";

// OBTENER MENUS
export function getMenus(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/menus");
        return dispatch({
            type: "GET_MENUS",
            payload: json.data
        })
    };
};

// FILTRAR MENUS (*SE DEBE PROBAR*)
export function getMenu(data){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/menus?name=${data.name}${data.filter ? `&filter=${data.filter}` : ''}${data.price ? `&price=${data.price}` : ''}`);
            return dispatch({
                type: "GET_MENU",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    };
};

// BORRAR MENUS (*SE DEBE PROBAR*)
export function deleteMenu(name){
    return async function(dispatch){
        try {
            var json = await axios.delete("http://localhost:3001/menus/"+name)
            return dispatch({
                type: "DELETE_MENU",
                payload: json.data === "Menu deleted" ? name : ''
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// OBTENER COMIDAS (*SE DEBE PROBAR*)
export function getFoods(){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/foods");
            return dispatch({
                type: "GET_FOODS",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    };
};

// FILTRAR COMIDAS (*SE DEBE PROBAR*)
export function getFoodsFilters(name, order, filter){
    return async function(dispatch){
        try {
            var json = await axios.get(`http://localhost:3001/foods?${name ? `name=${name}`: ''}${order ? `&order=${order}` : ''}${filter ? `&filter=${filter}` : ''}`)
            return dispatch({
                type: "GET_FOOD_FILTER",
                payload: json.data.length > 0 ? json.data[0] : {}
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function postFood(data){
    return async function(){
        try {
            var json = await axios.post("http://localhost:3001/foods", data)
            return json
        } catch (error) {
            console.log(error)
        }
    }
}