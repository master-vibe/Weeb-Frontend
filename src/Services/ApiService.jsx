// api.service.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

const ApiService = {
  async request(endpoint, method, { data, ...options } = {}) {
    try {
      const response = await api.request({
        method,
        url: endpoint,
        data,
        ...options,
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
};


export default ApiService;
