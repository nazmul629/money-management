import {combineReducers} from 'redux'
import authReducer from './authReducers'


const rootRedecer = combineReducers({
    auth: authReducer
})
export default rootRedecer