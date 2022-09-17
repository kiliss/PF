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
            var json = await axios.get(`http://localhost:3001/menus?name=${data.name}${data.filter ? `&filter=${data.filter}` : ''}${data.price ? `&price=${data.price}` : ''}${data.vegetarian ? `&vegetarian=${data.vegetarian}` : ''}`);
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
export function getFood(id){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/foods/"+id)
                return dispatch({
                    type: "GET_FOOD",
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
                type: "GET_FOOD",
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
            var json = await axios.post("http://localhost:3001/foods/tomenu", payload)
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
                payload: json.data === "Food deleted" ? id : ''
            })
        } catch (error) {
            console.log(error)
        }
    };
};

// OBTENER USERS (*SE DEBE PROBAR*)
export function getUsers(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/users");
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
// OBTENER DETALLE DE USER POR ID (*SE DEBE PROBAR*)
export function getTableDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/table/"+id)
                return dispatch({
                    type: "GET_TABLE",
                    payload: json.data
                })
        } catch (error) {
            console.log(error)
        }
    };
};
// OBTENER tables (*SE DEBE PROBAR*)
export function getTable(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/table/table");
        return dispatch({
            type: "GET_TABLES",
            payload: json.data
        })
    };
};
//CREAR UNA MESA(*SE DEBE PROBAR)
export function createTable(payload){
    return async function(dispatch){
        try {
            var json =await axios.post("http://localhost:3001/table", payload)
            return json;
        } catch (error) {
            console.log (error)
        }
    }
}
// OBTENER BILLS (*SE DEBE PROBAR*)
export function getBill(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/bill/");
        return dispatch({
            type: "GET_BILLS",
            payload: json.data
        })
    };
};
export function getBillDetail(id){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/bill/"+id)
                return dispatch({
                    type: "GET_BILL",
                    payload: json.data
                })
        } catch (error) {
            console.log(error)
        }
    };
};
//CREAR UNA BILL(*SE DEBE PROBAR)
export function createBill(payload){
    return async function(dispatch){
        try {
            var json =await axios.post("http://localhost:3001/bill", payload)
            return json;
        } catch (error) {
            console.log (error)
        }
    }
}
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

// LOGIN SUCCESS (*SE DEBE PROBAR(nunca hice una función para esto(agustín))*)
export function loginSuccess(){
    return async function(dispatch){
        try {
            var loginn = await axios.get("http://localhost:3001/auth/login/success")
            return loginn.data
        } catch (error) {
            console.log(error)
        }
    };
};

// LOGIN FAIL (*SE DEBE PROBAR(nunca hice una función para esto(agustín))*)
export function loginFail(){
    return async function(dispatch){
        try {
            var loginx = await axios.get("http://localhost:3001/auth/login/failed")
            return loginx.data
        } catch (error) {
            console.log(error)
        }
    }
}

// LOGOUT (*SE DEBE PROBAR(nunca hice una función para esto(agustín))*)
export function logout(){
    return async function(dispatch){
        try {
            var logoutt = await axios.get("http://localhost:3001/auth/logout")
            return logoutt
        } catch (error) {
            console.log(error)
        }
    };
};