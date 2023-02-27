import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { TMovie, TMovieReturn } from "../interfaces/movies.interfaces";
import { returnMovieSchema } from "../schemas/movies.schemas";

const createMovieService = async (movieData: TMovie): Promise<TMovieReturn> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie: Movie = movieRepo.create(movieData);

  await movieRepo.save(movie);

  const newMovie = returnMovieSchema.parse(movie);

  return newMovie;
};

export default createMovieService;
