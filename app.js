import express from "express";
import moviesRoutes from "./routes/movies.js";

const app = express();

//parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//for using routes via app.use
app.use("/movies", moviesRoutes);

export default app;
