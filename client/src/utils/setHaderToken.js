import Axios from 'axios'
const setHaderToken = token =>{
    if(token){
        Axios.defaults.headers.common['Authorization'] = token
    }
    else{
        Axios.defaults.headers.common['Authorization'] = ''
    }
}
export default setHaderToken