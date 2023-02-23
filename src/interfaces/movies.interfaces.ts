import { movieSchemas, returnArrayMovieSchema, returnMovieSchema,MovieResult, movieUpdateSchema } from "../schemas/movies.schemas";
import { z } from "zod";
import { DeepPartial } from "typeorm";

type TMovie = z.infer<typeof movieSchemas>
type TMovieReturn = z.infer<typeof returnMovieSchema>
type TMoviesReturn = z.infer<typeof returnArrayMovieSchema>
type TMovieResult = z.infer<typeof MovieResult>
type TMovieUpdate = DeepPartial<TMovie>

export {
    TMovie,
    TMovieReturn,
    TMoviesReturn,
    TMovieResult,
    TMovieUpdate
}