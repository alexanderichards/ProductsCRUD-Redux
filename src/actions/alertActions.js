import { MOSTRAR_ALERTA, OCULTAR_ALERTA } from "../types"

export function showAlert(alert){
    return async (dispatch) => {
        dispatch({type: MOSTRAR_ALERTA, payload: alert})
    }
}

export function hideAlert(){
    return async (dispatch) => {
        dispatch({type: OCULTAR_ALERTA})
    }
}
