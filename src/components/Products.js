import React, { Fragment, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideAlert } from '../actions/alertActions'
import { getProducts } from '../actions/productAction'
import Product from './Product'

const Products = () => {


    const dispatch = useDispatch()


    const products = useSelector(state => state.products.products)
    const loading = useSelector(state => state.products.loading)
    const error = useSelector(state => state.products.error)

    useEffect(() => {
        // if(products.length === 0) return 
        const getProductsFunc = () => dispatch(getProducts())
        getProductsFunc()
        dispatch(hideAlert())
        // eslint-disable-next-line
    }, [])


    return (
        <Fragment>
            <h2 className='text-center my-5'>Products list</h2>
            { error ? <p className='alert alert-danger p2 mt-4 text-center font-weight-bold'>Something went wrong, could not fetch db products</p> : false}
            { loading ? <p className='text-center'>Cargando...</p> : false}
            <table className='table table-stripped'>
                <thead className='bg-primary table-dark'>
                    <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Price</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length === 0 ? 'There are no products' : (
                        products.map(product => <Product key={product.id} product={product}></Product>)
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}

export default Products
