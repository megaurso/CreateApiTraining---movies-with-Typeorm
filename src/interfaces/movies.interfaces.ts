import { movieSchemas, returnArrayMovieSchema, returnMovieSchema,MovieResult, movieUpdateSchema, MovieParms } from "../schemas/movies.schemas";
import { z } from "zod";
import { DeepPartial, Repository } from "typeorm";
import { Movie } from "../entities";


type TMovie = z.infer<typeof movieSchemas>
type TMovieReturn = z.infer<typeof returnMovieSchema>
type TMoviesReturn = z.infer<typeof returnArrayMovieSchema>
type TMovieResult = z.infer<typeof MovieResult>
type TMovieUpdate = DeepPartial<TMovie>
type iMovieUpdate = DeepPartial<Movie>;
type iMovieRepo = Repository<Movie>;
type TMovieQuerys = z.infer<typeof MovieParms>

export {
    TMovie,
    TMovieReturn,
    TMoviesReturn,
    TMovieResult,
    TMovieUpdate,
    iMovieUpdate,
    iMovieRepo,
    TMovieQuerys
}