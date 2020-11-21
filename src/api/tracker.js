import axios from 'axios';
import { AsyncStorage } from 'react-native'

const instance = axios.create({
    baseURL: ' http://0e679058b5e8.ngrok.io'
});

instance.interceptors.request.use(
    // Called when we are about to make a request
    async (config) => {
        const token = await AsyncStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    
    // Called when we get an error with making a request
    (err) => {
        // Devolve uma promessa rejeitada com o erro
        return Promise.reject(err);
    }
);

export default instance;