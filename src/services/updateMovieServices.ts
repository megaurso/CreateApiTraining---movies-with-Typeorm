import { Repository } from "typeorm"
import {AppDataSource} from "../data-source"
import { Movie } from "../entities"
import { TMovieReturn, TMovieUpdate } from "../interfaces/movies.interfaces"
import { returnMovieSchema } from "../schemas/movies.schemas"

const updateMovieServices =async (movieData:TMovieUpdate,idMovie:number):Promise<TMovieReturn> => {
    const movieRepository:Repository<Movie> = AppDataSource.getRepository(Movie)

    const oldMovieData = await movieRepository.findOneBy({
        id:idMovie
    })

    const movie = movieRepository.create({
        ...oldMovieData,
        ...movieData
    })

    await movieRepository.save(movie)

    const updateUser = returnMovieSchema.parse(movie)

    return updateUser
}
export default updateMovieServices