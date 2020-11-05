import { createStore, applyMiddleware, compose } from 'redux'
import thumk from 'redux-thunk'
import reducer from "./reducers"

const store = createStore(reducer, compose(applyMiddleware(thumk),
    typeof window === 'object' &&
        typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
        window.__REDUX_DEVTOOLS_EXTENSION__() : f => f))

export default store


