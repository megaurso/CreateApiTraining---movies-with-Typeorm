import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Movie } from "../entities";
import { TMoviesReturn } from "../interfaces/movies.interfaces";
import { returnArrayMovieSchema } from "../schemas/movies.schemas";

const listMovies =async ():Promise<TMoviesReturn> => {
    
    const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie)

    const findMovies:Array<Movie> = await movieRepo.find()

    const movies = returnArrayMovieSchema.parse(findMovies)

    return movies

}

export default listMovies