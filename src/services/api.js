import axios from 'axios';

const Api = axios.create({ baseURL: "https://api-huntproject.herokuapp.com/" });

export default Api;