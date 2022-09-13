import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import roodReducer from "../redux/reducers"


export const store = createStore(roodReducer, composeWithDevTools(applyMiddleware(thunk)))