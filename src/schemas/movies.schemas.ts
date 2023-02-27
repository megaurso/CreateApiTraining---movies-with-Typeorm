import {z} from "zod"

const movieSchemas = z.object({
    name: z.string().min(3).max(50),
    description: z.string().nullable().optional(),
    duration: z.number().int(),
    price: z.number().int()
})

const returnMovieSchema = movieSchemas.extend({
    id: z.number()
})

const returnArrayMovieSchema = returnMovieSchema.array()

const MovieResult = z.object({
    nextPage: z.string().nullable(),
    prevPage: z.string().nullable(),
    count: z.number().int(),
    data: z.array(returnMovieSchema)
})

const movieUpdateSchema = movieSchemas.partial()

export {
    movieSchemas,
    returnMovieSchema,
    returnArrayMovieSchema,
    MovieResult,
    movieUpdateSchema
}