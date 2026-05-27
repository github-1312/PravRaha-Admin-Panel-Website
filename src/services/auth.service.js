import axios from "axios"
import { API_NODE, NODE_BASE_URL } from "./api"





export const onLogin = async (email, password)=>{

    try {

        const response = await axios.post(`${NODE_BASE_URL}/auth/login`,{email,password , client:'admin_app'})
       
        return response.data
        
    } catch (error) {
        console.log(error)
        throw error
    }
}


export const getUser = async ( token )=>{
    try {
         const response = await API_NODE.get('/auth/user')
        return response.userData
    } catch (error) {

         console.log(error)
    }
}