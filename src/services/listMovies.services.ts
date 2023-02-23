import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Movie } from "../entities";
import { TMoviesReturn } from "../interfaces/movies.interfaces";
import { returnArrayMovieSchema } from "../schemas/movies.schemas";

const listMovies = async (payload: any): Promise<TMoviesReturn> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);
  const page: number = +payload.page || 1;
  const perPage: number = +payload.perPage || 5;

  const findMovies: Array<Movie> = await movieRepo.find({
    take: perPage,
    skip: perPage * (page - 1),
    order:{
        id: "DESC",
        price: "DESC",
        duration: "DESC"
    }
  });

  const movies = returnArrayMovieSchema.parse(findMovies);

  return movies;
};

export default listMovies;
