import axios, { AxiosInstance } from "axios";

export default abstract class Awareness {
	axiosInstance: AxiosInstance;
	constructor(jwt: string) {
		this.axiosInstance = axios.create({
			baseURL: import.meta.env.VITE_REST_SERVER_URL,
			headers: {
				Authorization: `Bearer ${jwt}`
			}
		});
	}
}

class BasisUrl {
	public readonly basisUrl = import.meta.env.VITE_REST_SERVER_URL;
}

export const basisUrl = new BasisUrl();
