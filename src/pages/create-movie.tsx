import React from "react";
import { AxiosError, Genre, Movie } from "services";
import { IApi, IEntity } from "types";
import { Form, Loader } from "components";
import { toast } from "react-hot-toast";
import { number, object, string } from "yup";
import { NavigateFunction } from "react-router-dom";

interface MovieState {
  title: string;
  genreId: string;
  stock: string;
  rate: string;
  genres: IEntity.Genre[];
  isLoading: boolean;
  errors: Partial<Omit<MovieState, "errors">>;
  singleData: any;
}

interface MovieProps {
  movieID: string;
  navigate: NavigateFunction;
}

export default class MovieComponent extends Form<MovieProps, MovieState> {
  state: MovieState = {
    title: "",
    genreId: "",
    stock: "",
    rate: "",
    genres: [],
    isLoading: true,
    errors: {},
    singleData: {},
  };

  schema = object({
    title: string().min(5).trim().label("title").required(),
    genreId: string().label("Genre").required(),
    rate: number().min(0).max(255).label("Rate").required(),
    stock: number().min(0).max(255).label("Stock").required(),
  });

  async componentDidMount() {
    const { data: genres } = await Genre.List();
    this.setState({ genres, isLoading: false });

    const { movieID } = this.props;
    if (movieID !== "new") {
      const { data: singleData } = await Movie.Single({ movieID });
      this.setState({ singleData });
    }
  }

  onSubmit = async (data: MovieState) => {
    try {
      if (this.props.movieID === "new") {
        await Movie.Create({
          title: data.title,
          genreId: data.genreId,
          numberInStock: +data.stock,
          dailyRentalRate: +data.rate,
        });
        toast.success("Movie created successfully!");
      } else {
        await Movie.Edit({
          id: this.props.movieID,
          title: data.title,
          genreId: data.genreId,
          numberInStock: +data.stock,
          dailyRentalRate: +data.rate,
        });
        toast.success("Movie edited successfully!");
      }

      this.props.navigate("/movies");
    } catch (error: any) {
      if (error instanceof AxiosError && error.response) {
        toast.error(error.response.data);
      }
    }
  };

  render() {
    const { isLoading, genres, singleData } = this.state;
    console.log(singleData);

    if (isLoading) return <Loader />;

    const { movieID } = this.props;
    const isEditMode = movieID !== "new";

    return (
      <main className="container">
        <div>
          <h1>Movie [{isEditMode ? "Edit" : "Create"}]</h1>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput(
              "title",
              "TITLE",
              undefined,
              singleData?.title ?? ""
            )}
            {this.renderSelect("genreId", "Movie genre", genres)}
            {this.renderInput(
              "stock",
              "Stock",
              "text",
              singleData?.numberInStock?.toString() ?? ""
            )}

            {this.renderInput(
              "rate",
              "Daily Rent Rate",
              "text",
              singleData?.dailyRentalRate?.toString() ?? ""
            )}
            {this.renderSubmit(isEditMode ? "Edit" : "Create")}
          </form>
        </div>
      </main>
    );
  }
}
