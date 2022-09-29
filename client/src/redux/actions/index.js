import axios from "axios";

// CONVIERTE UN OBJETO EN UN STRING DE QUERIES
const objectToQueries = (data = {}) => {
    let string = '';
    Object.getOwnPropertyNames(data).forEach((p, i) => {
        if (i === 0) string += `?${p}=${data[p]}`;
        else string += `&${p}=${data[p]}`;
    });
    return string;
};

// OBTENER MENUS
export function getMenus() {
    return async function (dispatch) {
        var json = await axios.get("/menus");
        return dispatch({
            type: "GET_MENUS",
            payload: json.data
        })
    };
};

// FILTRAR MENUS
export function getMenu(data) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/menus${objectToQueries(data)}`);
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
export function createMenus(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post("/menus", payload)
            return json;
        } catch (error) {
            console.log(error)
        }
    };
};

// BORRAR MENUS (*SE DEBE PROBAR*)
export function deleteMenu(name) {
    return async function (dispatch) {
        try {
            var json = await axios.delete("/menus/" + name)
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
export function updateMenu(name) {
    return async function (dispatch) {
        try {
            var json = await axios.put("/menus/" + name)
            return dispatch({
                type: "UPDATE_MENU",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
// DELETE FOOD FROM MENU (*SE DEBE PROBAR*)
export function deleteFoodFromMenu({menu, food}) {
    return async function (dispatch) {
        try {
            var json = await axios.delete("/menus/" + menu + "/" + food)
            return dispatch({
                type: "DELETE_FOOD_FROM_MENU",
                payload: json.data === "Food deleted" ? food : ''
            })
        } catch (error) {
            console.log(error)
        }
    };
}

// OBTENER DETALLES DE COMIDAS POR ID (*SE DEBE PROBAR)
export function getFood(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/foods/" + id)
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
export function getFoods(data) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/foods${objectToQueries(data)}`);
            return dispatch({
                type: "GET_FOODS",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    };
};

// agregar comida a menu (*SE DEBE PROBAR*)
export function postFood(data) {
    return async function () {
        try {
            var json = await axios.post("/foods", data)
            return json
        } catch (error) {
            console.log(error)
        }
    }
}

// AGREGAR COMIDA A MENU EXISTENTE
export function addFoodToMenu(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post("/foods/tomenu", payload)
            return json
        } catch (error) {
            console.log(error)
        }
    }
}
// MODIFICAR COMIDA POR ID
export function updateFood(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.put("/foods/" + payload.id, payload)
            return json
        } catch (error) {
            console.log(error)
        }
    }
}

// BORRAR COMIDA (*SE DEBE PROBAR*)
export function deleteFood(id) {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`/foods/${id}`)
            return dispatch({
                type: "DELETE_FOOD",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
};

// OBTENER USERS (*SE DEBE PROBAR*)
export function getUsers() {
    return async function (dispatch) {
        var json = await axios.get("/users");
        return dispatch({
            type: "GET_USERS",
            payload: json.data
        })
    };
};

// PUT USER
export function editUser(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.put("/users", payload)
            return json
        } catch (error) {
            console.log(error)
        }
    }
}

// OBTENER DETALLE DE USER POR ID (*SE DEBE PROBAR*)
export function getUserDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/users/" + id)
            return dispatch({
                type: "GET_USER",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    };
};

export function getProfile() {
    return async function (dispatch) {
        try {
            var json = await axios.get("/users/user", {
                headers: {
                    'Authorization': localStorage.getItem('user')
                        ? localStorage.getItem('user')
                        : ''
                }
            })
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
export function createUser(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post("/users", payload)
            return json;
        } catch (error) {
            console.log(error)
        }
    };
};


// OBTENER DETALLE DE USER POR ID (*SE DEBE PROBAR*)
export function getTableDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/table/:" + id)
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
export function getTable() {
    return async function (dispatch) {
        var json = await axios.get("/table/table");
        return dispatch({
            type: "GET_TABLES",
            payload: json.data
        })
    };
};
//CREAR UNA MESA(*SE DEBE PROBAR)
export function createTable(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post("/table", payload)
            return json;
        } catch (error) {
            console.log(error)
        }
    }
}
// OBTENER BILLS (*SE DEBE PROBAR*)
export function getBill() {
    return async function (dispatch) {
        var json = await axios.get("/bill/");
        return dispatch({
            type: "GET_BILLS",
            payload: json.data
        })
    };
};
export function getBillDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/bill/" + id)
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
export function createBill(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post("/bill", payload)
            return json;
        } catch (error) {
            console.log(error)
        }
    }
}
// OBTENER RESERVAS (*SE DEBE PROBAR*)
export function getReservations() {
    return async function (dispatch) {
        var json = await axios.get("/reservation/users");
        return dispatch({
            type: "GET_RESERVATIONS",
            payload: json.data
        })
    };
};

// OBTENER DETALLE DE UNA RESERVA POR ID (*SE DEBE PROBAR*)
export function getReservationDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/reservation/" + id)
            return dispatch({
                type: "GET_RESERVATION",
                payload: json.data
            });
        } catch (error) {
            console.log(error)
        }
    };
};

// OBTENER DETALLE DE UNA RESERVA POR ID (*SE DEBE PROBAR*)
export function getReservationByUser(id_User) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/reservation/users/" + id_User)
            return dispatch({
                type: "GET_RESERVATION",
                payload: json.data
            });
        } catch (error) {
            console.log(error)
        }
    };
};

// CREAR UNA RESERV (*SE DEBE PROBAR*)
export function createReservation(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post("/reservation", payload)
            return json;
        } catch (error) {
            console.log(error)
        }
    };
};

//V1-login-google
export function loginGoogle(user) {
    return async function () {
        try {
            var json = await axios.post("/users/google", user)
            return json;
        } catch (error) {
            console.log(error)
        }
    };
};

//V1-login-facebook
export function loginFacebook(user) {
    return async function () {
        try {
            var json = await axios.post("/users/facebook", user)
            return json;
        } catch (error) {
            console.log(error)
        }
    };
};

// LOGIN SUCCESS (*SE DEBE PROBAR(nunca hice una función para esto(agustín))*)
export function login(user) {
    return async function () {
        try {
            let login = await axios.post("/login", user);
            console.log(login)
            return login.data;
        } catch (error) {
            console.log(error)
        }
    };
};

// LOGIN FAIL (*SE DEBE PROBAR(nunca hice una función para esto(agustín))*)
export function loginFail() {
    return async function (dispatch) {
        try {
            var loginx = await axios.get("/auth/login/failed")
            return loginx.data
        } catch (error) {
            console.log(error)
        }
    }
}

// LOGOUT (*SE DEBE PROBAR(nunca hice una función para esto(agustín))*)
export function logout() {
    return async function () {
        try {
            localStorage.removeItem('user')
            var logoutt = await axios.get("/auth/logout")
            return logoutt
        } catch (error) {
            console.log(error)
        }
    };
};

export function loginWithFacebook() {
    return async function () {
        try {
            var login = await axios.get("/auth/facebook");
            return login;
        } catch (error) {
            console.log(error)
        }
    }
};

export function giveFoodValoration(foodId, userId, stars) {
    return async function () {
        try {
            const { data } = await axios.post(`/foods/${foodId}?user=${userId}&valoration=${stars}`);
            return data;
        } catch (err) {
            console.log(err);
        }
    };
};
export function deleteReservation(id) {
    return async function (dispatch) {
        try {
            var json = await axios.delete("/reservation/delete/" + id)
            return dispatch({
                type: "DELETE_RESERVATION",
                payload: json.data
            });
        } catch (error) {
            console.log(error)
        }
    };
};