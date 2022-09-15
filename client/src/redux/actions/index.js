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

// FILTRAR MENUS
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

// CREAR MENU (*SE DEBE PROBAR*)
export function createMenu(payload){
    return async function(dispatch){
        try {
            var json = await axios.post("http://localhost:3001/menus", payload)
            return json;
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
    };
};

// UPDATE MENU (*SE DEBE PROBAR*)
export function updateMenu(name){
    return async function(dispatch){
        try {
            var json = await axios.put("http://localhost:3001/menus/"+name)
            return dispatch({
                type: "UPDATE_MENU",
                payload: json.data
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

// OBTENER DETALLES DE COMIDAS POR ID (*SE DEBE PROBAR)
export function getFoodDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/foods/"+id)
                return dispatch({
                    type: "GET_FOOD_DETAIL",
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
    };
};
 // agregar comida a menu (*SE DEBE PROBAR*)
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

// AGREGAR COMIDA A MENU EXISTENTE
export function addFoodToMenu(payload){
    return async function(dispatch){
        try {
            var json = await axios.post("http://localhost:3001/foods/tomenu"+payload)
            return json
        } catch (error) {
            console.log(error)
        }
    }
}

// BORRAR COMIDA (*SE DEBE PROBAR*)
export function deleteFood(id){
    return async function(dispatch){
        try {
            var json = await axios.delete("http://localhost:3001/foods/"+id)
            return dispatch({
                type: "DELETE_FOOD",
                payload: json.data === "food borrada" ? id : ''
            })
        } catch (error) {
            console.log(error)
        }
    };
};

// OBTENER USERS (*SE DEBE PROBAR*)
export function getUsers(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/users/users");
        return dispatch({
            type: "GET_USERS",
            payload: json.data
        })
    };
};

// OBTENER DETALLE DE USER POR ID (*SE DEBE PROBAR*)
export function getUserDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/users/"+id)
                return dispatch({
                    type: "GET_USER",
                    payload: json.data
                })
        } catch (error) {
            console.log(error)
        }
    };
};

// CREAR UN USUARIO (*SE DEBE PROBAR*)
export function createUser(payload){
    return async function(dispatch){
        try {
            var json = await axios.post("http://localhost:3001/users", payload)
            return json;
        } catch (error) {
            console.log(error)
        }
    };
};

// OBTENER RESERVAS (*SE DEBE PROBAR*)
export function getReservations(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/reservation/users");
        return dispatch({
            type: "GET_RESERVATIONS",
            payload: json.data
        })
    };
};

// OBTENER DETALLE DE UNA RESERVA POR ID (*SE DEBE PROBAR*)
export function getReservationDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/reservation/"+id)
                return dispatch({
                    type: "GET_RESERVATION",
                    payload: json.data
                })
        } catch (error) {
            console.log(error)
        }
    };
};

// CREAR UNA RESERV (*SE DEBE PROBAR*)
export function createReservation(payload){
    return async function(dispatch){
        try {
            var json = await axios.post("http://localhost:3001/reservation", payload)
            return json;
        } catch (error) {
            console.log(error)
        }
    };
};

