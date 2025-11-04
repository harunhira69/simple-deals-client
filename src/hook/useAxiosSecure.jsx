import axios from "axios"
import useAuth from "./useAuth"
import { useEffect } from "react";

const instance = axios.create({
    baseURL:'http://localhost:3000'
})
const useAxiosSecure = ()=>{
    const {user} = useAuth();


    useEffect(()=>{

        // Request Interceptor
        const interceptorsRequest = instance.interceptors.request.use((config)=>{
             config.headers.authorization = ` Bearer ${user?.accessToken}`;
             return config
             
        })
        return ()=>{
            instance.interceptors.request.eject(interceptorsRequest)
        }
      
    },[user])
 
    // instance.interceptors.request.use((config)=>{
    //     console.log(config)
    //     config.headers.authorization = ` Bearer ${user.accessToken}`
    //     return config;

    // })

    // return instance
}
export default useAxiosSecure;