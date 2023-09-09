import axios from "axios";

export const makeRequest = axios.create({
	baseURL: import.meta.env.VITE_BASE_URL,
	headers: {
		"Content-Type": "application/json",
		"x-access-token": import.meta.env.VITE_APP_TOKEN,
	},
});

//temporal use for post request***
export const api = {
	baseURL: import.meta.env.VITE_BASE_URL,
	token: import.meta.env.VITE_APP_TOKEN,
};
