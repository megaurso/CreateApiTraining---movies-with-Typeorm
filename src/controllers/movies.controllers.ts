import { Request, Response } from "express";
import { Movie } from "../entities";
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
  let { page, perPage }: any = req.query;
  const movies: TMoviesReturn = await listMovies(page, perPage);
  const data = movies;

  perPage = req.query.perPage === undefined ? 5 : req.query.perPage;
  page =
    isNaN(Number(req.query.page)) || Number(req.query.page) < 0
      ? 1
      : Number(req.query.page);
  page = page * perPage;

  const nextPageFunction = () => {
    const resultPage: number = Number(page) / Number(perPage) + 1;
    const nextPage = `http://localhost:3000/movies?page=${+resultPage}&perPage${+perPage}`;
    if (data.length <= 4) {
      const nextPage = null;
      return nextPage;
    }
    return nextPage.toString();
  };

  const previusPageFunction = () => {
    const resultPage: number = Number(page) / Number(perPage) - 1;
    const previusPage = `http://localhost:3000/movies?page=${+resultPage!}&perPage${+perPage}`;

    if (page <= 0) {
      const previusPage = null;
      return previusPage;
    }

    return previusPage.toString();
  };

  const queryFinish: TMovieResult = {
    nextPage: nextPageFunction(),
    previusPage: previusPageFunction(),
    count: movies.length,
    data: [...movies],
  };

  return res.json(queryFinish);
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
