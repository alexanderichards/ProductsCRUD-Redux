import { combineReducers } from "redux";
import AlertReducer from "./alertReducer";
import ProductReducer from './productsReducer'

export default combineReducers({
    products: ProductReducer,
    alerts: AlertReducer
})