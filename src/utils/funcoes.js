import api from "../services/api";
import { getItem } from "./storage";

export async function cadastrar(route, data) {
  try {
    const response = await api.post(route, data, {
      headers: {
        Authorization: "Bearer " + getItem("token"),
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}
