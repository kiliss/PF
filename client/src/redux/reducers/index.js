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
        default:
        return state;
    }
}

export default rootReducer;