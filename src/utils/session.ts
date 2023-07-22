import config from "config";

export const getSession = () => ({ accessToken: localStorage.getItem(config.api.tokenKEY)! });

export const clearSession = () => {
	localStorage.removeItem(config.api.tokenKEY)!;
};

export const setSession = (accessToken: string) => {
	localStorage.setItem(config.api.tokenKEY, accessToken);
};
