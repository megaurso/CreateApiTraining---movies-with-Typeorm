import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { AppError } from "../errors";

const ensureMovieAlreadyExist = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userRepository: Repository<Movie> = AppDataSource.getRepository(Movie);
  if (req.body.name) {
    const findMovie = await userRepository.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (findMovie) {
      throw new AppError("Movie already exists.", 409);
    }
  }


  return next();
};

export default ensureMovieAlreadyExist;
