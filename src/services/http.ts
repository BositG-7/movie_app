import axios from "axios";
import config from "config";
import { getSession } from "utils";
export { AxiosError } from "axios";

const http = axios.create({ baseURL: config.api.baseURL });

http.interceptors.request.use(
	(request) => {
		const { accessToken } = getSession();

		// @ts-ignore
		request.headers = {
			...request.headers,
			...(accessToken ? { [config.api.tokenKEY]: accessToken } : {}),
		};

		return request;
	},
	(error) => Promise.reject(error)
);

export default http;
