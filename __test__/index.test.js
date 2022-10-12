import app from "../app.js";
import request from "supertest";

describe("GET/movies", () => {
  it("returns content-type as application/json", async () => {
    const res = await request(app).get("/movies");
    expect(res.headers["content-type"]).toEqual(
      "application/json; charset=utf-8"
    );
  });
});

describe("POST/movies", () => {
  it("returns status code 201 if the new movie is created successfully", async () => {
    const res = await request(app).post("/movies").send({
      title: "new Movie",
      director: "new director",
      release_date: "2010-07-16",
    });
    expect(res.statusCode).toEqual(201);
  });
  it("returns status code 400 if the new movie cannot be created successfully", async () => {
    const res = await request(app).post("/movies").send({
      title: "new Movie",
      release_date: "2010-07-16",
    });
    expect(res.statusCode).toEqual(400);
  });
});

describe("PUT/movies", () => {
  it("returns status code 200 if the new movie is updated successfully", async () => {
    const res = await request(app).put("/movies/1").send({
      title: "new Movie",
      director: "new director",
      release_date: "2010-07-16",
    });
    expect(res.statusCode).toEqual(200);
  });
  it("returns status code 400 if the new movie cannot be updated successfully because of missing id in URL", async () => {
    const res = await request(app).put("/movies/555").send({
      title: "new Movie",
      director: "new director",
      release_date: "2010-07-16",
    });
    expect(res.statusCode).toEqual(400);
  });
  it("returns status code 400 if the new movie cannot be updated successfully because of missing data", async () => {
    const res = await request(app).put("/movies/1").send({
      title: "new Movie",
      release_date: "2010-07-16",
    });
    expect(res.statusCode).toEqual(400);
  });
});
