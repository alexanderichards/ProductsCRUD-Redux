import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { showAlert, hideAlert} from '../actions/alertActions'
import { addProduct } from '../actions/productAction'
// actions de redux 

const NewProduct = ({ history }) => {


    // use dispathc  and create the function
    const dispatch = useDispatch()

    // call the action from project action
    const addProductFunc = product => dispatch(addProduct(product))

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')

    // Acceder al state del store
    const loading = useSelector(state => state.products.loading)
    const error = useSelector(state => state.products.error)
    const alerta = useSelector(state => state.alerts.alerta)

    const submitForm = (e) => {
        e.preventDefault()

        if (name.trim() === '' || price <= 0) {
            const alerta = {
                msg: 'Both fields are required',
                classes: 'alert alert-danger text-center text-uppercase p3'
            }
            dispatch(showAlert(alerta))
            return
        }

        dispatch(hideAlert())   

        addProductFunc({
            name,
            price: price.toString()
        })

        setName('')
        setPrice('')

        history.push('/')
    }


    return (
        <div className='row justify-content-center'>
            <div className='col-md-8'>
                <div className='card'>
                    <div className='card-body'>
                        <h2 className='text-center mb-4 font-weight-bold'>Add new product</h2>
                        {alerta ? <p className={alerta.classes}>{alerta.msg}</p> : null}
                        <form onSubmit={submitForm}>
                            <div className='form-group'>
                                <label>Product name</label>
                                <input type='text' className='form-control' placeholder='Product name' name='name' value={name} onChange={e => setName(e.target.value)}></input>
                            </div>
                            <div className='form-group'>
                                <label>Product price</label>
                                <input type='number' min='0' className='form-control' placeholder='Product price' name='price' value={price} onChange={e => setPrice(Number(e.target.value))}></input>
                            </div>
                            <button type='submit' className='btn btn-primary font-weight-bold text-uppercase d-block w-100'>Add</button>
                        </form>
                        {loading ? <p>Cargando...</p> : false}
                        {error ? <p className='alert alert-danger p2 mt-4 text-center'>Something went wrong</p> : false}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewProduct
