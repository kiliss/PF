import axios from "axios";

export function getMenus(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/");
        return dispatch({
            type: "GET_MENUS",
            payload: json.data
        })
    };
}