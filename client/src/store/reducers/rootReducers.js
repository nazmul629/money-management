import {combineReducers} from 'redux'
import authReducer from './authReducers'
import transactionReducer from './transactionReducer'


const rootRedecer = combineReducers({
    auth: authReducer,
    transactions: transactionReducer
})

export default rootRedecer