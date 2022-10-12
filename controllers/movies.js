import { v4 as uuidv4 } from "uuid";

let movies = [
  {
    id: "1",
    title: "Inception",
    director: "Christopher Nolan",
    release_date: "2010-07-16",
  },
  {
    id: "2",
    title: "The Irishman",
    director: "Martin Scorsese",
    release_date: "2019-09-27",
  },
];

export const getMovies = (req, res) => {
  if (movies.length === 0) {
    res.status(200).send("There is no movie here");
  } else {
    res.status(200).json(movies);
  }
};

export const getMovie = (req, res) => {
  const { id } = req.params;
  const foundMovie = movies.find((movie) => movie.id === id);
  if (!foundMovie) {
    res.status(400).json({ msg: `No movie with the id of ${id} found` });
  } else {
    for (let movie of movies) {
      if (movie.id === id) {
        res.status(200).json(movie);
        return;
      }
    }
  }
};

export const createMovie = (req, res) => {
  const movie = req.body;
  if (!movie.title) {
    res.status(400).json({ msg: `Please add title` });
  } else if (!movie.director) {
    res.status(400).json({ msg: `Please add director` });
  } else if (!movie.release_date) {
    res.status(400).json({ msg: `Please add release_date` });
  } else {
    movies.push({ ...movie, id: uuidv4() });
    res
      .status(201)
      .send(`Movie with the title ${movie.title} added to database`);
  }
};

export const deleteMovie = (req, res) => {
  const { id } = req.params;
  const foundMovie = movies.find((movie) => movie.id === id);
  if (!foundMovie) {
    res.status(400).json({ msg: `No movie with the id of ${id} found` });
  } else {
    movies = movies.filter((movie) => {
      if (movie.id !== id) {
        return true;
      }
      return false;
    });
    res
      .status(200)
      .send(`The movie with the id ${id} deleted from the database`);
  }
};

export const updateMoviePartial = (req, res) => {
  const { id } = req.params;
  const { title, director, release_date } = req.body;
  const foundMovie = movies.find((movie) => movie.id === id);
  if (!foundMovie) {
    res.status(400).json({ msg: `No movie with the id of ${id} found` });
  } else {
    if (title) {
      foundMovie.title = title;
    }
    if (director) {
      foundMovie.director = director;
    }
    if (release_date) {
      foundMovie.release_date = release_date;
    }

    res.status(200).send(`Movie with the id ${id} has been updated`);
  }
};

export const updateMovieCompletely = (req, res) => {
  const { id } = req.params;
  const foundMovie = movies.find((movie) => movie.id === id);
  if (!foundMovie) {
    res.status(400).json({ msg: `No movie with the id of ${id} found` });
  } else {
    const updatedMovie = req.body;
    movies.forEach((movie) => {
      if (movie.id === id) {
        if (!updatedMovie.title) {
          res.status(400).json({ msg: `Please add title` });
        } else if (!updatedMovie.director) {
          res.status(400).json({ msg: `Please add director` });
        } else if (!updatedMovie.release_date) {
          res.status(400).json({ msg: `Please add release_date` });
        } else {
          movie.title = updatedMovie.title;
          movie.director = updatedMovie.director;
          movie.release_date = updatedMovie.release_date;
          res.status(200).send(`Movie with the id ${movie.id} updated`);
        }
      }
    });
  }
};
