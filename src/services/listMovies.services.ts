import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { TMovieResult } from "../interfaces/movies.interfaces";
import { returnArrayMovieSchema } from "../schemas/movies.schemas";

const listMovies = async (page: any, perPage: any): Promise<TMovieResult> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);
  let take: number = +perPage;
  let skip: number = +page;

  if (!Number.isInteger(take)) {
    Math.ceil(take);
  }

  if (!Number.isInteger(skip)) {
    Math.ceil(skip);
  }

  if (Math.sign(Number(take)) === -1 || Number(take) > 5) {
    take = 5;
  }

  if (Number(skip) < 0) {
    skip = 1;
  }
  const totalPages = Math.ceil(+movieRepo.count / perPage);

  const nextPageFunction = () => {
    const nextPage = `http://localhost:3000/movies?page=${
      page + 1
    }&perPage=${+perPage}`;
    if (+totalPages < page) {
      const nextPage = null;
      return nextPage;
    }
    return nextPage.toString();
  };
  console.log(+totalPages)
  console.log()

  const previusPageFunction = () => {
    let previusPage: string | null = `http://localhost:3000/movies?page=${
      page - 1
    }&perPage=${+perPage}`;

    if (page <= 1) {
      previusPage = null;
    }
    return previusPage;
  };

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

  const queryFinish: TMovieResult = {
    nextPage: nextPageFunction(),
    prevPage: previusPageFunction(),
    count: await movieRepo.count(),
    data: [...movies],
  };

  return queryFinish;
};

export default listMovies;
