import express from "express";
import {
  createMovie,
  getMovies,
  getMovie,
  deleteMovie,
  updateMoviePartial,
  updateMovieCompletely,
} from "../controllers/movies.js";

const router = express.Router();

//to get all movies
router.get("/", getMovies);

//to get a specific movie with id
router.get("/:id", getMovie);

//to create a new movie
router.post("/", createMovie);

//to delete a movie with id
router.delete("/:id", deleteMovie);

//to update movie partially
router.patch("/:id", updateMoviePartial);

//to update movie completely
router.put("/:id", updateMovieCompletely);

export default router;
