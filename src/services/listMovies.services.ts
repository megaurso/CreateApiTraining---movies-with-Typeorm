import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { TMoviesReturn } from "../interfaces/movies.interfaces";
import { returnArrayMovieSchema } from "../schemas/movies.schemas";

const listMovies = async (page: any, perPage: any): Promise<TMoviesReturn> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);
  let take: number = +perPage;
  let skip: number = +page;

  if(!Number.isInteger(take)){
    Math.round(take)
  }
  if(!Number.isInteger(skip)){
    Math.round(skip)
  }
  if (Math.sign(Number(take)) === -1 ||  Number(take) > 5) {
    take = 5
  }

  
  if(Number(skip) < 0){
    skip = 1
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
