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
  let { page, perPage }: any = req.query;
  perPage = req.query.perPage === undefined ? 5 : req.query.perPage;
  page = isNaN(Number(req.query.page)) || Number(req.query.page) < 0 ? 1 : Number(req.query.page);
  const movies: TMoviesReturn = await listMovies(page, perPage);
  const allMovies: TMoviesReturn = await listMovies(1,99)
  const data = movies;
  
  const nextPageFunction = () => {
    const nextPage = `http://localhost:3000/movies?page=${page + 1}&perPage=${+perPage}`;
    if (data.length <= 4) {
      const nextPage = null;
      return nextPage;
    }
    return nextPage.toString();
  };

  const previusPageFunction = () => {
    let previusPage: string | null = `http://localhost:3000/movies?page=${page - 1}&perPage=${+perPage}`;

    if (page <= 1) {
      previusPage = null;
    }
    return previusPage;
  };
  
  const queryFinish: TMovieResult = {
    nextPage: nextPageFunction(),
    prevPage: previusPageFunction(),
    count: allMovies.length,
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
