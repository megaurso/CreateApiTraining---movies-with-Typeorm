import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";
import { TMoviesReturn } from "../interfaces/movies.interfaces";
import { returnArrayMovieSchema } from "../schemas/movies.schemas";

const listMovies = async (page: any, perPage: any): Promise<TMoviesReturn> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);
  const take: number = +perPage || 5;
  const skip: number = +page || 1;

  if (Number(skip) < 0 || Number(take) < 0) {
    throw new AppError("Offset or Limit cannot be negative", 400);
  }

  const findMovies: Array<Movie> = await movieRepo.find({
    take,
    skip: take * (skip - 1),
    order: {
      id: "DESC",
      price: "DESC",
      duration: "DESC",
    },
  });

  const movies = returnArrayMovieSchema.parse(findMovies);

  return movies;
};

export default listMovies;
