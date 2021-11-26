import axios from "axios";


class AxiosInstance {
    static create(url:string, hostType: string = 'default', widthHeaders = false) {
        const config = {
            baseURL:url, // all requests are routed to /api/something....
            timeout: 60000, // default timeout of 60 seconds
            //withCredentials: true,
        };

        const axiosInstance = axios.create(config);


        // before the request is sent to the server, add jwt to the Authorization header
        axiosInstance.interceptors.request.use(config => {

            const token = localStorage.getItem('token');
            if (token) {
                config.headers['Authorization'] = `Bearer ${token.replace('%20', ' ')}`;
            }
            return config;
        });

        // whenever a response is received from the node layer
        axiosInstance.interceptors.response.use(response => {
            if (widthHeaders) {
                return {
                    data: response.data,
                    headers: response.headers
                }
            }
            return response.data;
        }, error => {
            return Promise.reject(error.response ? {
                code: error.response.status,
                data: error.response.data
            } : {message: error});
        });
        return axiosInstance;

    }
}


export default AxiosInstance
