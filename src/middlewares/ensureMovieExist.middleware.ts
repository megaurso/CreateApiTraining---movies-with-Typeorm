import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import AppDataSource from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

const ensureMovieExistMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const findMovie = await userRepository.findOne({
    where: {
      id: parseInt(req.params.id),
    },
  });

  if (!findMovie) {
    throw new AppError("Movie not found", 404);
  }

  return next();
};

export default ensureMovieExistMiddleware;
