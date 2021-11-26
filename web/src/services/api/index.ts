import Instances from './instances'
import {Api} from "./base";


export interface ApiInstance {
  [key: string]: Api | any
}

const { REACT_APP_API_URL } = process.env
console.log("Pr", process.env)

console.log(REACT_APP_API_URL, 'URL')

const ApiEndpoints = Instances as {
  [key:string]:any
}

const api = {} as ApiInstance


for(const prop of Object.keys(ApiEndpoints)){
  const routeName = prop.replace(/^[a-z]|[A-Z]/g, function(v, i) {
    return  i === 0 ? v.toLowerCase() : "-" + v.toLowerCase();
  })

  api[routeName] = new ApiEndpoints[prop](`${REACT_APP_API_URL}/${routeName}`)
}

export default api

