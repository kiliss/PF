const initialStare = {
    menus : [],
    menu: {},
    foods: [],
    food: {},
};

function rootReducer (state= initialStare, action) {
    switch(action.type){
        case "GET_MENUS":
            return{
                ...state,
                menus: action.payload
            }
        case "GET_MENU":
            return{
                ...state,
                menu: action.payload
            }
        case "DELETE_MENU":
            return{
                ...state.menus.filter((m) => m.name !== action.payload)
            }
        case "GET_FOODS":
            return{
                ...state,
                foods: action.payload
            }
        case "GET_FOOD_FILTER":
            return{
                ...state,
                food: action.payload
            }
            
        default:
        return state;
    }
}

export default rootReducer;