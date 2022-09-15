const initialStare = {
    menus : [],
    menu: {},
    foods: [],
    food: {},
    foodDetail: [],
    users: [],
    user: [],
    reservations: [],
    reservation: [],
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
        case "CREATE_MENU":
            return{
                ...state
            }
        case "DELETE_MENU":
            return{
                ...state.menus.filter((m) => m.name !== action.payload)
            }
        case "UPDATE_MENU":
            return{
                ...state.menus.map((m) => m.name === action.payload.name ? action.payload : m.name)
            }
        case "GET_FOODS":
            return{
                ...state,
                foods: action.payload
            }
        case "GET_FOOD_DETAIL":
            return{
                ...state,
                foodDetail: action.payload
            }
        case "GET_FOOD_FILTER":
            return{
                ...state,
                food: action.payload
            }
        case "ADD_FOOD_TO_MENU":
            return{
                ...state
            }
        case "DELETE_FOOD":
            return{
                ...state.foods.filter((f) => f.id !== action.payload)
            }
        case "GET_USERS":
            return{
                ...state,
                users: action.payload
            }
        case "GET_USER":
            return{
                ...state,
                user: action.payload
            }
        case "CREATE_USER":
            return{
                ...state
            }
        case "GET_RESERVATIONS":
            return{
                ...state,
                reservations: action.payload
            }
        case "GET_RESERVATION":
            return{
                ...state,
                reservation: action.payload
            }
        case "CREATE_RESERVATION":
            return{
                ...state
            }
        default:
        return state;
    }
}

export default rootReducer;