import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types";

// cada reducer tiene su propio state
const initialState = {
    alerta: null,
}

const AlertReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOSTRAR_ALERTA:
            return{
                ...state,
                alerta: action.payload
            }
        case OCULTAR_ALERTA:
            return{
                ...state,
                alerta: null
            }
        default:
            return state;
    }
} 

export default AlertReducer