import { AGREGAR_PRODUCTO, AGREGAR_PRODUCTO_ERROR, AGREGAR_PRODUCTO_EXITO, COMENZAR_DESCARGA_PRODUCTOS, COMENZAR_EDICION_PRODUCTO, DESCARGA_PRODUCTOS_ERROR, DESCARGA_PRODUCTOS_EXITO, OBTENER_PRODUCTO_EDITAR, OBTENER_PRODUCTO_ELIMINAR, PRODUCTO_EDITADO_ERROR, PRODUCTO_EDITADO_EXITO, PRODUCTO_ELIMINADO_EXITO, PRODUCTO_ELIMINAOD_ERROR } from "../types"
import axiosClient from '../config/axios'

export function addProduct(product){
    return async (dispatch) => {
        dispatch(agregarProducto())

        console.log(process.env.REACT_APP_BACKEND_URL)

        try {
            const response = await axiosClient.post('/products', product)

            product.id = response.data.id
            dispatch(agregarProductoExito(product))

            alert('Product added successfully')

        } catch (error) {
            console.log(error)
            dispatch(agregarProductoError(true))
            alert("product could not be added")
        }
    }
}

const  agregarProducto = () => ({
    type: AGREGAR_PRODUCTO
})

const agregarProductoExito = product => ({
    type: AGREGAR_PRODUCTO_EXITO,
    payload: product
})

const agregarProductoError = value => ({
    type: AGREGAR_PRODUCTO_ERROR,
    payload: value
})


// FUNCTION TO GET THE DB PRODUCTS
export function getProducts(){
    return async (dispatch) => {
        try {

            // set loading to true
            dispatch(descargarProductos())

            const response = await axiosClient.get('/products')
            // console.log(response)

            dispatch(descargarProductosExito(response.data))
        } catch (error) {
            console.log(error)
            // set loading to false
            dispatch(descargarProductosError(true))
            
        }
    }
}

const descargarProductos = () => ({
    type: COMENZAR_DESCARGA_PRODUCTOS,
    payload: true
})
const descargarProductosExito = (projects) => ({
    type: DESCARGA_PRODUCTOS_EXITO,
    payload: {projects, loading: false}
})
const descargarProductosError = (errorValue) => ({
    type: DESCARGA_PRODUCTOS_ERROR,
    payload: {loading: false, error: errorValue}
})


// SELECCIONA Y ELIMINA EL PRODUCOT
export function deleteProduct(id){
    return async (dispatch) => {

        dispatch(obtenerProductoEliminar(id))

        try {
            await axiosClient.delete(`/products/${id}`)
            // console.log(response)

            dispatch(eliminarProductExito())
        } catch (error) {
            console.log(error)
            dispatch(eliminarProductError(true))
        }
    }
}

const obtenerProductoEliminar = id => ({
    type: OBTENER_PRODUCTO_ELIMINAR,
    payload: id
})

const eliminarProductExito = () => ({
    type: PRODUCTO_ELIMINADO_EXITO,
})

const eliminarProductError = (value) => ({
    type: PRODUCTO_ELIMINAOD_ERROR,
    payload: value
})



export function selectProductToEdit(product){
    return async (dispatch) => {
        dispatch(obtenerProductoEditar(product))
    }
}

const obtenerProductoEditar = product => ({
    type: OBTENER_PRODUCTO_EDITAR,
    payload: product
})



export function editProductFunc(product){
    return async (dispatch) => {
        dispatch(editarProducto(product))

        try {
            const response = await axiosClient.put(`/products/${product.id}`, product)
            console.log(response)

            dispatch(editarProductoExito(product))
        } catch (error) {
            console.log(error)
            dispatch(editProductoError())

        }
    }
}

const editarProducto = (product) => ({
    type: COMENZAR_EDICION_PRODUCTO,
    payload: product
})

const editarProductoExito = (product) => ({
    type: PRODUCTO_EDITADO_EXITO,
    payload: product
})

const editProductoError = () => ({
    type: PRODUCTO_EDITADO_ERROR
})