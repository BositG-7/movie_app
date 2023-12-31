export namespace IEntity {
	export interface Movie {
		_id: string;
		title: string;
		genre: Genre;
		numberInStock: number;
		dailyRentalRate: number;
		username: string;
		isLiked: boolean;
	}

	export interface Genre {
		_id: string;
		name: string;
	}

	export interface Sort {
		path: keyof Movie;
		order: "asc" | "desc";
	}

	export type User = {
		_id: string;
		name: string;
		email: string;
		isAdmin: boolean;
	} | null;
}

export namespace IApi {
	export namespace Genre {
		export namespace List {
			export interface Request {}
			export type Response = IEntity.Genre[];
		}
		export namespace Create {
			export interface Request extends Params {}

			export interface Params {
				name:string
			}

			export type Response = IEntity.Movie;
		}
		export namespace Edit {
			export interface Request extends Params {}

			export interface Params {
				id:string

				name:string
			}

			export type Response = IEntity.Movie;
		}

		export namespace Single {
			export interface Request {
				genreID: string;
			}
			export type Response = IEntity.Genre;
		}
	}

	export namespace Movie {
		export namespace List {
			export interface Request {}
			export type Response = IEntity.Movie[];
		}

		export namespace Single {
			export interface Request {
				movieID: string;
			}

			export type Response = IEntity.Movie;
		}

		export namespace Create {
			export interface Request {
				title: string;
				genreId: string;
				numberInStock: number;
				dailyRentalRate: number;
			}

			export type Response = IEntity.Movie;
		}
		export namespace Edit {
			export interface Request extends Params {}

			export interface Params {
				title: string;
				genreId: string;
				numberInStock: number;
				dailyRentalRate: number;
				id:string
			}

			export type Response = IEntity.Movie;
		}
	}

	export namespace Auth {
		export namespace Login {
			export interface Request {
				email: string;
				password: string;
			}

			export interface Response {
				data: string;
			}
		}

		export namespace Register {
			export interface Request {
				name: string;
				email: string;
				password: string;
			}

			export interface Response {
				_id: string;
				name: string;
				email: string;
			}
		}

		export namespace GetMe {
			export interface Request {}

			export type Response = IEntity.User;
		}
	}
}
