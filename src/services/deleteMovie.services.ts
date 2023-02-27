import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";

const deleteMovieService = async (idMovie: number): Promise<void> => {
  const movieRepository: Repository<Movie> = AppDataSource.getRepository(Movie);

  const movie = await movieRepository.findOne({
    where: {
      id: idMovie,
    },
  });

  await movieRepository.remove(movie!);
};

export default deleteMovieService;
