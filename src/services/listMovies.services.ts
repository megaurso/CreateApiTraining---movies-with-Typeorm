import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Movie } from "../entities";
import { TMovieQuerys, TMovieResult } from "../interfaces/movies.interfaces";
import { returnArrayMovieSchema } from "../schemas/movies.schemas";

const listMovies = async (payload: TMovieQuerys): Promise<TMovieResult> => {
  const movieRepo: Repository<Movie> = AppDataSource.getRepository(Movie);
  let perPage = payload.perPage === undefined ? 5 : payload.perPage;
  let page =
    isNaN(Number(payload.page)) || Number(payload.page) < 0
      ? 1
      : Number(payload.page);
  let take: number = +perPage;
  let skip: number = +page;

  if (!Number.isInteger(take)) {
    Math.ceil(take);
  }

  if (!Number.isInteger(skip)) {
    Math.ceil(skip);
  }

  if (
    Math.sign(Number(take)) === -1 ||
    Number(take) > 5 ||
    Number(take) === 0
  ) {
    take = 5;
  }

  if (Number(skip) <= 0) {
    skip = 1;
  }
  const totalPages = Math.ceil((await movieRepo.count()) / perPage);

  const nextPageFunction = () => {
    if (page === 0) {
      page = 1;
    }

    
    console.log(perPage);
    let nextPage = `http://localhost:3000/movies?page=${
      page + 1
    }&perPage=${+perPage}`;
    if (Number(perPage) === 0) {
      nextPage = `http://localhost:3000/movies?page=${
        page + 1
      }&perPage=5`;
    }
    if (totalPages <= page) {
      const nextPage = null;
      return nextPage;
    }
    return nextPage.toString();
  };

  const previusPageFunction = () => {
    let previusPage: string | null = `http://localhost:3000/movies?page=${
      page - 1
    }&perPage=${+perPage}`;

    if (page <= 1) {
      previusPage = null;
    } else if (totalPages === page - 1 || totalPages >= page) {
      previusPage = `http://localhost:3000/movies?page=${
        page - 1
      }&perPage=${+perPage}`;
    } else {
      previusPage = null;
    }
    return previusPage;
  };

  const sort = payload.sort === undefined ? "id" : payload.sort;
  let order = payload.order === undefined ? "ASC" : payload.order;
  if (!payload.sort) {
    order = "ASC";
  }

  const findMovies: Array<Movie> = await movieRepo.find({
    take,
    skip: take * (skip - 1),
    order: {
      [sort]: order,
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
