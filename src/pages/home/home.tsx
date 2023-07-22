import { Component } from "react";
import _ from "lodash";
import { IEntity } from "types";
import { paginate } from "utils";
import { Movie, Genre } from "services";
import config from "config";
import { Pagination, Loader } from "components";
import { Genres, Movies } from "./components";

interface HomeState {
	genreID: string;
	search: string;
	movies: IEntity.Movie[];
	genres: IEntity.Genre[];
	currentPage: number;
	pageSize: number;
	isLoading: boolean;
	columnSort: IEntity.Sort;
}

export interface HomeProps {
	// onNavigate: (pathname: string) => void;
}

export default class Home extends Component<HomeProps, HomeState> {
	state: HomeState = {
		genreID: "",
		search: "",
		movies: [],
		genres: [],
		pageSize: config.pagination.pageSize,
		currentPage: 1,
		isLoading: true,
		columnSort: {
			path: "title",
			order: "asc",
		},
	};

	handleGenreSelect = (genreID: string) => {
		this.setState({ genreID, search: "", currentPage: 1 });
	};

	handleSearch = (search: string) => {
		this.setState({ search });
	};

	handlePageChange = (currentPage: number) => {
		this.setState({ currentPage });
	};

	handleToggleLike = (movieID: string) => {
		const movies = [...this.state.movies];
		const movieIdx = movies.findIndex((m) => m._id === movieID);
		const movie = movies[movieIdx];
		movie.isLiked = !movie.isLiked;

		this.setState({ movies });
	};

	handleDelete = (movieID: string) => {
		const movies = this.state.movies.filter((m) => m._id !== movieID);

		const currentPage = Math.ceil(movies.length / this.state.pageSize);

		this.setState({ movies, currentPage });
	};

	handleSort = (path: keyof IEntity.Movie) => {
		this.setState(({ columnSort }) => {
			if (columnSort.path === path) {
				return { columnSort: { path, order: columnSort.order === "asc" ? "desc" : "asc" } };
			}

			return { columnSort: { path, order: "asc" } };
		});
	};

	async componentDidMount() {
		const { data: movies } = await Movie.List();
		const { data: genres } = await Genre.List();

		this.setState({
			movies,
			genres: [{ _id: "", name: "All Genres" }, ...genres],
			isLoading: false,
		});
	}

	render() {
		const { genreID, search, movies, pageSize, currentPage, isLoading, genres, columnSort } =
			this.state;

		const filteredMovies = genreID ? movies.filter((movie) => movie.genre._id === genreID) : movies;

		const searchedMovies = filteredMovies.filter(
			(movie) =>
				movie.title.toLowerCase().includes(search.toLowerCase()) ||
				movie.username.toLowerCase().includes(search.toLowerCase())
		);

		const sortedMovies = _.orderBy(searchedMovies, columnSort.path, columnSort.order);
		const paginatedMovies = paginate(sortedMovies, pageSize, currentPage);

		if (isLoading) return <Loader />;
		return (
			<div className="container">
				<div className="row">
					<Genres genres={genres} onSelect={this.handleGenreSelect} genreID={genreID} />
					<div className="col">
						<Movies
							columnSort={columnSort}
							movies={paginatedMovies}
							count={searchedMovies.length}
							search={search}
							onSort={this.handleSort}
							onDelete={this.handleDelete}
							onToggleLike={this.handleToggleLike}
							onChangeSearch={this.handleSearch}
						/>
						<Pagination
							count={searchedMovies.length}
							currentPage={currentPage}
							pageSize={pageSize}
							onPageChange={this.handlePageChange}
						/>
					</div>
				</div>
			</div>
		);
	}
}
