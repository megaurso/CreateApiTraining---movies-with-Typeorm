import { Request, Response } from "express";
import {
  TMovie,
  TMovieResult,
  TMovieReturn,
  TMoviesReturn,
} from "../interfaces/movies.interfaces";
import createMovieService from "../services/createMovieService";
import deleteMovieService from "../services/deleteMovie.services";
import listMovies from "../services/listMovies.services";
import updateMovieServices from "../services/updateMovieServices";

const createMovieController = async (req: Request, res: Response) => {
  const userData: TMovie = req.body;

  const newMovie = await createMovieService(userData);

  return res.status(201).json(newMovie);
};

const listMoviesController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  
  const movies: TMovieResult = await listMovies(req.query);

  return res.json(movies);
};

const deleteMoviesController = async (req: Request, res: Response) => {
  await deleteMovieService(parseInt(req.params.id));

  return res.status(204).send();
};

const updateMoviesController = async (req: Request, res: Response) => {
  const movieData = req.body;
  const idMovie = +req.params.id;

  const updateMovie: TMovieReturn = await updateMovieServices(
    movieData,
    idMovie
  );

  return res.json(updateMovie);
};

export {
  createMovieController,
  listMoviesController,
  deleteMoviesController,
  updateMoviesController,
};
