import axios from "axios"
  const Instance = axios.create({
        baseURL:'http://localhost:3000'
    })

const useAxios = ()=>{
    return Instance
  
}
export default useAxios;