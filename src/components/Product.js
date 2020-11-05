import React from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { deleteProduct, selectProductToEdit } from '../actions/productAction'


const Product = ({ product }) => {

    const dispatch = useDispatch()
    const history = useHistory()

    // const selectProductToEdit = useSelector(state => state.products.selectProductToEdit)

    const confirmarEliminarProducto = id => {
        if (window.confirm("Are you sure, you want to delete the product")) dispatch(deleteProduct(id))
    }

    // funcion que redirie de forma programada
    const redireccinarEdicion = product => {
        dispatch(selectProductToEdit(product))
        history.push(`/products/edit/${product.id}`)
    }

    return (
        <tr>
            <td>{product.name}</td>
            <td><span className='font-weight-bold'>$ {product.price}</span></td>
            <td className='acciones'>
                {/* <Link to={`/products/edit/${product.id}`} className='btn btn-primary mr-2'>Editar</Link> */}
                <button className='btn btn-primary mr-2' onClick={() => redireccinarEdicion(product)}>Editar</button>
                <button className='btn btn-danger' onClick={() => confirmarEliminarProducto(product.id)}>Eliminar</button>
            </td>
        </tr>
    )
}

export default Product
