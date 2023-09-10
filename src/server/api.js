import axios from "axios";


const peopleApi = axios.create({
  baseURL: "http://localhost:3000/pessoas"
});


export default peopleApi;
