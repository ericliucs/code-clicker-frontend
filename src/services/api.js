import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || 'https://code-clicker-frontend.herokuapp.com';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const register = (username, password) => {
  return api.post("/register", { username, password });
};

export const login = (username, password) => {
  return api.post("/login", { username, password });
};

export const saveGame = (gameData) => {
  return api.post("/save", gameData);
};

export const loadGame = () => {
  return api.get("/load");
};

export const getLeaderboard = () => {
  return api.get("/leaderboard");
};
