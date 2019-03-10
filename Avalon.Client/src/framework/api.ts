import axios from "axios";
export const BASE = "http://localhost:3000";

export default class Api {
  static async get(url: string) {
    return await axios.get(`${BASE}${url}`);
  }
  static async Post(url: string, data: object) {
    return await axios.post(`${BASE}${url}`, data);
  }
  static async put(url: string, data: object) {
    return await axios.put(`${BASE}${url}`);
  }
}
