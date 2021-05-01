import Axios from 'axios'
import * as Types from './type'
import jwtDecode from 'jwt-decode'
import setHaderToken from '../../utils/setHaderToken'

export const register = (user, history) => dispatch => {

    Axios.post('/api/users/register', user)
        .then((res) => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: {}
                }
            })
            console.log(res)
            history.push('/login')
        })
        .catch(error => {
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}


export const login = (user, history) => dispatch => {

    Axios.post('/api/users/login', user)
        .then(res =>{
            let token = res.data.token
            localStorage.setItem('auth_token',token)
            setHaderToken(token)
            let decode = jwtDecode(token)

            
            dispatch({
                type:Types.SET_USER,
                
                payload:{
                    user:decode
                }
            })
            history.push('/')

        })
        .catch(error => {
            console.log(error.response.data)
            dispatch({
                type: Types.USERS_ERROR,
                payload: {
                    error: error.response.data
                }
            })
        })
}

export const logout = history =>{
    localStorage.removeItem('auth_token')
    history.push('/login')

    return{
        type: Types.SET_USER,
        payload:{
            user: {}
        }
    }
}