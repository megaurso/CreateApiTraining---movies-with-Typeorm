import { Router } from "express";
import { createMovieController, deleteMoviesController, listMoviesController, updateMoviesController } from "../controllers/movies.controllers";
import { enuseDataIsValidMiddleware } from "../middlewares/ensureDataIsValid.middleware";
import ensureMovieAlreadyExist from "../middlewares/ensureMovieAlreadyExist.middleware";
import ensureMovieExistMiddleware from "../middlewares/ensureMovieExist.middleware";
import { movieSchemas, movieUpdateSchema } from "../schemas/movies.schemas";

const movieRoutes: Router = Router();

movieRoutes.post("", enuseDataIsValidMiddleware(movieSchemas),ensureMovieAlreadyExist,createMovieController);
movieRoutes.get("", listMoviesController)
movieRoutes.delete("/:id", ensureMovieExistMiddleware,deleteMoviesController)
movieRoutes.patch("/:id",enuseDataIsValidMiddleware(movieUpdateSchema), ensureMovieExistMiddleware,ensureMovieAlreadyExist,updateMoviesController)

export default movieRoutes;
