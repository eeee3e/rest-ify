import axios from 'axios';

const baseURL = 'http://127.0.0.1:8000/';

const axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 5000,
	headers: {
		Authorization: localStorage.getItem('access_token')
			? 'Bearer ' + localStorage.getItem('access_token')
			: null,
	}, 
});


axiosInstance.interceptors.response.use( 
  function (response) {
    return response;
  }, 
  function (error) {
    const originalRequest = error.config;

    if ( error.response.data.status === 401 ) {};
  }
  
  
  
  )

export default axiosInstance;