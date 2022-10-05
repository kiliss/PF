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
        var json = await axios.get("/menus/all", {
            headers: {
                'Authorization': localStorage.getItem('session')
                    ? localStorage.getItem('session')
                    : ''
            }
        });
        return dispatch({
            type: "GET_MENUS",
            payload: json.data
        })
    };
};

export function getVisibleMenus(data) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/menus/visible${objectToQueries(data)}`);
            return dispatch({
                type: "GET_MENUS_NAVBAR",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
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

export function getVisibleMenu(data) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/menus/visible${objectToQueries(data)}`);
            return dispatch({
                type: "GET_MENU",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    };
};

export function menuExist(name) {
    return async function () {
        try {
            var { data } = await axios.get(`/menus/exist/${name}`);
            return data.message
        } catch (err) {
            console.log(err)
        }
    }
}

// CREAR MENU (*SE DEBE PROBAR*)
export function createMenus(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post("/menus", payload, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return json;
        } catch (err) {
            console.log(err);
        }
    };
};

// BORRAR MENUS (*SE DEBE PROBAR*)
export function deleteMenu(name) {
    return async function (dispatch) {
        try {
            var json = await axios.delete("/menus/" + name, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return dispatch({
                type: "DELETE_MENU",
                payload: json.data === "Menu deleted" ? name : ''
            })
        } catch (err) {
            console.log(err);
        }
    };
};

// UPDATE MENU (*SE DEBE PROBAR*)
export function updateMenu(name, payload) {
    return async function (dispatch) {
        try {
            var json = await axios.put("/menus/" + name, payload, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return dispatch({
                type: "UPDATE_MENU",
                payload: json.data
            })
        } catch (err) {
            console.log(err);
        }
    }
}
// DELETE FOOD FROM MENU (*SE DEBE PROBAR*)
export function deleteFoodFromMenu({ menu, food }) {
    return async function (dispatch) {
        try {
            var json = await axios.delete("/menus/" + menu + "/" + food, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return dispatch({
                type: "DELETE_FOOD_FROM_MENU",
                payload: json.data === "Food deleted" ? food : ''
            })
        } catch (err) {
            console.log(err);
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

export function refreshFood() {
    return async function (dispatch) {
        try {
            return dispatch({
                type: "GET_FOOD",
                payload: {}
            })
        } catch (error) {
            console.log(error)
        }
    };
};

// FILTRAR COMIDAS (*SE DEBE PROBAR*)
export function getFoods() {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/foods/all`, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
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
export function getFoodsSearch(data) {
    return async function (dispatch) {
        try {
            var json = await axios.get(`/foods/search${objectToQueries(data)}`, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
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
            var json = await axios.post("/foods/all", data, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return json;
        } catch (err) {
            console.log(err);
        }
    }
}

// AGREGAR COMIDA A MENU EXISTENTE
export function addFoodToMenu(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post("/foods/tomenu", payload, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return json;
        } catch (err) {
            console.log(err);
        }
    }
}
// MODIFICAR COMIDA POR ID
export function updateFood(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.put("/foods/" + payload.id, payload, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return json;
        } catch (err) {
            console.log(err);
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
        var json = await axios.get("/users", {
            headers: {
                'Authorization': localStorage.getItem('session')
                    ? localStorage.getItem('session')
                    : ''
            }
        });
        return dispatch({
            type: "GET_USERS",
            payload: json.data,
        })
    };
};

// PUT USER
export function editUser(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.put("/users", payload, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return json;
        } catch (err) {
            console.log(err);
        }
    }
}

export function selfDisableAcc(ban) {
    return async function (dispatch) {
        try {
            var json = await axios.put("/users/disableacc", ban, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return dispatch({
                type: "GET_USER",
                payload: json.data
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function emailExist(email) {
    return async function () {
        try {
            var { data } = await axios.get(`/users/findemail/?email=${email}`)
            return data
        } catch (err) {
            console.log(err)
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
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return dispatch({
                type: "GET_USER",
                payload: json.data
            });
        } catch (err) {
            console.log(err);
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


//V1-recuperar contraseña
export function recuperarContra(email) {
    return async function () {
        try {
            var json = await axios.post("/users/forgotPassword", { email })
            return json;
        } catch (error) {
            console.log(error)
        }
    };
};

//V1-recuperar contraseña
export function resetPassword(user) {
    return async function () {
        try {
            var json = await axios.post(`/users/resetPassword/${user.id}/${user.token}`, user)
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
            var json = await axios.get("/table/" + id)
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

//BORRAR Table
export function deleteTable(id) {
    return async function (dispatch) {
        try {
            const response = await axios.delete(`/table/${id}`)
            return dispatch({
                type: "DELETE_TABLE",
                payload: response.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}
// Editar Table
export function editTable(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.put("/table/" + payload.id, payload);
            return json;
        } catch (err) {
            console.log(err);
        }
    }
}

//CREAR UNA MESA(*SE DEBE PROBAR)
export function createTable(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post("/table", payload)
            return json;
        } catch (error) {
            return error.response.data
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
        var json = await axios.get("/reservation/users", {
            headers: {
                'Authorization': localStorage.getItem('session')
                    ? localStorage.getItem('session')
                    : ''
            }
        });
        return dispatch({
            type: "GET_RESERVATIONS",
            payload: json.data
        });
    };
};

// OBTENER DETALLE DE UNA RESERVA POR ID (*SE DEBE PROBAR*)
export function getReservationDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("/reservation/" + id, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return dispatch({
                type: "GET_RESERVATION",
                payload: json.data
            });
        } catch (err) {
            console.log(err);
        }
    };
};

// CREAR UNA RESERV (*SE DEBE PROBAR*)
export function createReservation(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.post("/reservation", payload, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return json;
        } catch (err) {
            console.log(err);
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
            localStorage.removeItem('session')
            var logoutt = await axios.get("/auth/logout")
            return logoutt
        } catch (error) {
            console.log(error)
        }
    };
};


export function giveFoodValoration(foodId, userId, stars) {
    return async function () {
        try {
            const { data } = await axios.post(`/foods/score/${foodId}?user=${userId}&valoration=${stars}`, {}, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    };
};

export function giveFoodCommentary(foodId, userId, comment) {
    return async function () {
        try {
            const { data } = await axios.post(`/foods/comment/${foodId}?user=${userId}`, { comment }, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    };
};

export function deleteReservation(id) {
    return async function (dispatch) {
        try {
            var json = await axios.delete("/reservation/delete/" + id, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return dispatch({
                type: "DELETE_RESERVATION",
                payload: json.data
            });
        } catch (err) {
            console.log(err);
        }
    };
};

export function putUserName(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.put("/users/name", payload, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return json;
        } catch (err) {
            console.log(err);
        }
    }
}

export function putUserPasswd(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.put("/users/passwd", payload, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return json;
        } catch (err) {
            console.log(err);
        }
    }
}

export function putUserPhoto(payload) {
    return async function (dispatch) {
        try {
            var json = await axios.put("/users/photo", payload, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return json;
        } catch (err) {
            console.log(err)
        }
    }
}

export function comparePassword(payload) {
    return async function () {
        try {
            var json = await axios.post("/login/validate", payload)
            return json.data
        } catch (error) {
            console.log(error)
        }
    }
}

export function getRooms() {
    return async function (dispatch) {
        try {
            var { data } = await axios.get("/users/messages/rooms", {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return dispatch({
                type: "GET_ROOMS",
                payload: data
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function getMessages(id) {
    return async function (dispatch) {
        try {
            var { data } = await axios.get("/users/messages/" + id, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            return dispatch({
                type: "GET_MESSAGES",
                payload: data
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function postMessage(payload) {
    return async function (dispatch) {
        try {
            var { data } = await axios.post("/message", payload, {
                headers: {
                    'Authorization': localStorage.getItem('session')
                        ? localStorage.getItem('session')
                        : ''
                }
            });
            data.user = { user: payload.user };
            return dispatch({
                type: "POST_MESSAGE",
                payload: data
            })
        } catch (err) {
            console.log(err);
        }
    }
}

export function receiveMessages(payload) {
    return async function (dispatch) {
        try {
            return dispatch({
                type: "POST_MESSAGE",
                payload: payload
            })
        } catch (err) {
            console.log(err);
        }
    }
}