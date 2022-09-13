const initialStare = {
    menu : [],
};

function rootReducer (state= initialStare, action) {
    switch(action.type){
        case "GET_MENUS":
            return{
                ...state,
                menu: action.payload
            }
    }
}

export default rootReducer;