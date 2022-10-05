const initialState = {
  menus: [],
  menusNavbar: [],
  menu: {},
  foods: [],
  food: {},
  users: [],
  user: {},
  reservations: [],
  reservation: [],
  table: [],
  tables: [],
  rooms: {},
  messages: [],
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_MENUS":
      return {
        ...state,
        menus: action.payload,
      };
    case "GET_MENUS_NAVBAR":
      return {
        ...state,
        menusNavbar: action.payload,
      };
    case "GET_MENU":
      return {
        ...state,
        menu: action.payload,
      };
    case "CREATE_MENU":
      return {
        ...state,
      };
    case "DELETE_MENU":
      return {
        ...state,
        menus: state.menus.filter((e) => e.name !== action.payload),
      };
    case "DELETE_FOOD_FROM_MENU":
      return {
        ...state,
      };
    case "UPDATE_MENU":
      return {
        ...state,
      };
    case "GET_FOODS":
      return {
        ...state,
        foods: action.payload,
      };
    case "GET_FOOD":
      return {
        ...state,
        food: action.payload,
      };
    case "ADD_FOOD_TO_MENU":
      return {
        ...state,
      };
    case "DELETE_FOOD":
      return {
        ...state,
      };
    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };
    case "GET_USER":
      return {
        ...state,
        user: action.payload,
      };
    case "CREATE_USER":
      return {
        ...state,
      };
    case "GET_RESERVATIONS":
      return {
        ...state,
        reservations: action.payload,
      };
    case "GET_RESERVATION":
      return {
        ...state,
        reservation: action.payload,
      };
    case "CREATE_RESERVATION":
      return {
        ...state,
      };
    case "GET_TABLE":
      return {
        ...state,
        table: action.payload,
      };
    case "GET_TABLES":
      return {
        ...state,
        tables: action.payload,
      };
    case "GET_BILLS":
      return {
        ...state,
        bills: action.payload,
      };
    case "GET_BILL":
      return {
        ...state,
        bill: action.payload,
      };
    case "DELETE_RESERVATION":
      return {
        ...state,
        reservation: action.payload,
      };
    case "GET_MESSAGES":
      return {
        ...state,
        messages: action.payload,
      };
    case "GET_ROOMS":
      return {
        ...state,
        rooms: action.payload,
      };
    case "POST_MESSAGE":
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    default:
      return state;
  }
}

export default rootReducer;
