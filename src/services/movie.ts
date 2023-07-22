import http from "./http";
import { IApi } from "types";

export const List = () => http.get<IApi.Movie.List.Response>("/movies");

export const Single = ({ movieID }: IApi.Movie.Single.Request) =>
  http.get<IApi.Movie.Single.Response>(`/movies/${movieID}`);

export const Create = ({...body}: IApi.Movie.Create.Request) =>
  http.post<IApi.Movie.Create.Response>(`/movies`, body);

export const Edit = ({ id, ...body }: IApi.Movie.Edit.Request) =>
  http.put<IApi.Movie.Edit.Response>(`/movies/${id}`, body);

  export const Delete = ({ movieID }: IApi.Movie.Single.Request) =>
  http.delete<IApi.Movie.Single.Response>(`/movies/${movieID}`);

