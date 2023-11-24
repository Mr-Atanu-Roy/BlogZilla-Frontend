import axios from "axios";
import config from "../../config/config";
import { 
    useGetAccessToken,
    useGetRefreshToken,
    useRequestTokens,
    useSetStoreToken,
    useLogout,
} from "../../hooks/index"


// const privateAxiosClient = axios.create({
//     baseURL: config.BASE_API_ENDPOINT,
//     timeout: 30000,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// //Request interceptor: To add access token in every request header
// privateAxiosClient.interceptors.request.use((config) => {

//     const accessToken = useGetAccessToken();
//     if (accessToken) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//     }
//     return config;

// }, (error) => Promise.reject(error)

// );


// //Response interceptor: To refresh token and add access token in original header if it has expired
// privateAxiosClient.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;
  
//       // If the error status is 401 and there is no originalRequest._retry flag,
//       // it means the access token has expired and we need to refresh it
//       if (error.response.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;
  
//         try {
//             // Retry the original request with the new access token
//             const refreshToken = useGetRefreshToken();
//             // console.log("refreshToken", refreshToken)
//             if(!refreshToken) return Promise.reject(error);
            
//             const data = await useRequestTokens(refreshToken);
//             // console.log("data", data)
//             if(!data){
//                 useLogout(); //logout user if refresh token has expired
//                 return Promise.reject(error);
//             }

//             useSetStoreToken(data); //update the store with new tokens

//             originalRequest.headers.Authorization = `Bearer ${data.access}`;
//             return axios(originalRequest);
//         } catch (error) {
//             // console.log(error.message)
//             console.log("REFRESH TOKEN ERROR2")
//         }
//       }

//       return Promise.reject(error);
//     }
// );


function privateAxiosClient({
    baseURL = "",
    timeout = 30000,
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    
    }){
    
    const client = axios.create({
        baseURL: config.BASE_API_ENDPOINT+baseURL,
        timeout,
        headers,
    });

    client.interceptors.request.use((config) => {

        const accessToken = useGetAccessToken();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    
    }, (error) => Promise.reject(error)
    
    );

    client.interceptors.response.use(
        (response) => response,
        async (error) => {
          const originalRequest = error.config;
      
          // If the error status is 401 and there is no originalRequest._retry flag,
          // it means the access token has expired and we need to refresh it
          if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
      
            try {
                // Retrying the original request with the new access token
                const refreshToken = useGetRefreshToken();
                // console.log("refreshToken", refreshToken)
                if(!refreshToken) return Promise.reject(error);
                
                const data = await useRequestTokens(refreshToken);
                // console.log("data", data)
                if(!data){
                    useLogout(); //logout user if refresh token has expired
                    return Promise.reject(error);
                }
    
                useSetStoreToken(data); //update the store with new tokens
                
                //add new access token in the header and retry the original request
                originalRequest.headers.Authorization = `Bearer ${data.access}`; 
                return axios(originalRequest);
            } catch (error) {
                // console.log(error.message)
                console.log("REFRESH TOKEN ERROR2")
            }
          }
    
          return Promise.reject(error);
        }
    );

    return client
}

export default privateAxiosClient;
