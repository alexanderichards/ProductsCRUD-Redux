import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { showAlert, hideAlert } from '../actions/alertActions'
import { editProductFunc } from '../actions/productAction'


const EditProduct = ({history}) => {

    const dispatch = useDispatch()

    const editProduct = useSelector(state => state.products.editProduct)
    const error = useSelector(state => state.products.error)
    const loading = useSelector(state => state.products.loading)
    const alerta = useSelector(state => state.alerts.alerta)

    const [product, setProduct] = useState(editProduct)

    
    // if(!editProduct) return



    const handleChange = e => {
        setProduct({
            ...product,
            [e.target.name] : e.target.value
        })
    }

    const submitForm = e => {
        e.preventDefault()

        if(product.name.trim() === '' || product.price <= 0){
            const alerta = {
                msg: 'Both fields are required',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(showAlert(alerta))
            return
        }

        if(!window.confirm('Are you sure you want to update this product')){
            return
        }

        dispatch( editProductFunc({
            name: product.name,
            price: product.price.toString(),
            id: product.id
        }))

        dispatch(hideAlert()) 

        setProduct({
            name: '',
            price: '',
            id: ''
        })

        history.push('/')
    }

    return (
        <div className='row justify-content-center'> 
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>Edit product</h2>
                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                        <form onSubmit={submitForm}>
                            <div className='form-group'>
                                <label>Product name</label>
                                <input type='text' className='form-control' placeholder='Product name' name='name' value={product.name} onChange={handleChange}></input>
                            </div>
                            <div className='form-group'>
                                <label>Product price</label>
                                <input type='number' className='form-control' placeholder='Product price' name='price' value={product.price} onChange={handleChange}></input>
                            </div>
                            <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>Save changes</button>
                        </form>
                        { loading ? <p>Cargando...</p> : false}
                        { error ? <p className='alert alert-danger p2 mt-4 text-center'>Something went wrong</p> : false}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditProduct
