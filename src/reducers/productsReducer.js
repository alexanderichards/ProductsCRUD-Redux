import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_ERROR, AGREGAR_PRODUCTO_EXITO, COMENZAR_DESCARGA_PRODUCTOS, COMENZAR_EDICION_PRODUCTO, DESCARGA_PRODUCTOS_ERROR, DESCARGA_PRODUCTOS_EXITO, OBTENER_PRODUCTO_EDITAR, OBTENER_PRODUCTO_ELIMINAR, PRODUCTO_EDITADO_EXITO, PRODUCTO_ELIMINADO_EXITO, PRODUCTO_ELIMINAOD_ERROR } from "../types";

// cada reducer tiene su propio state
const initialState = {
    products: [],
    error: null,
    loading: false, 
    deleteProduct: null,
    editProduct: null

}

const ProductsReducer = (state = initialState, action) => {
    switch (action.type) {
        case AGREGAR_PRODUCTO:
            return{
                ...state,
                loading: true
            }
        case AGREGAR_PRODUCTO_EXITO:
            return{
                ...state,
                products: [...state.products, action.payload],
                loading: false,
                error: null
            }
        case AGREGAR_PRODUCTO_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        case COMENZAR_DESCARGA_PRODUCTOS:
            return{
                ...state,
                loading: action.payload
            }
        case DESCARGA_PRODUCTOS_EXITO:
            return{
                ...state,
                products: action.payload.projects,
                loading: action.payload.loading,
                error: null
            }
        case DESCARGA_PRODUCTOS_ERROR: 
            return{
                ...state,
                loading: action.payload.loading,
                error: action.payload.error,
            }
        case OBTENER_PRODUCTO_ELIMINAR:
            return{
                ...state,
                // deleteProduct: state.products.filter(product => product.id === action.payload)
                deleteProduct: action.payload
            }
        case PRODUCTO_ELIMINADO_EXITO:
            return{
                ...state,
                products: state.products.filter(product => product.id !== state.deleteProduct),
                deleteProduct: null
            }
        case PRODUCTO_ELIMINAOD_ERROR:
            return{
                ...state,
                error: action.payload,
                loading: false
            }
        case OBTENER_PRODUCTO_EDITAR:
            return{
                ...state,
                editProduct: action.payload
            }
        case COMENZAR_EDICION_PRODUCTO:
            return{
                ...state,
                editProduct: action.payload
            }
        case PRODUCTO_EDITADO_EXITO:
            return{
                ...state,
                products: state.products.map(product => product.id === action.payload.id ? ({...product, name : action.payload.name, price: action.payload.price}) : product),
                editProduct: null,
                loading: false,
                error: null 
            }
        default:
            return state;
    }
} 

export default ProductsReducer