const initialStare = {
    menus : [],
};

function rootReducer (state= initialStare, action) {
    switch(action.type){
        case "GET_MENUS":
            return{
                ...state,
                menus: action.payload
            }
        default:
        return state;
    }
}

export default rootReducer;