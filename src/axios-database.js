import axios from 'axios';

const instance = axios.create({
    baseURL: "https://debug-viewer.firebaseio.com/"
});

export default instance;
