import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";

import mapAPI from "./src/routes/mapAPI.js";
import user from "./src/routes/user.js";
import auth from "./src/routes/auth.js";
import geocode from "./src/routes/geocode.js";
import pathfinding from "./src/routes/pathfinding.js";

import errorHandler from "./src/middleware/error-handler.js";
import notFound from "./src/middleware/not-found.js";
import { limiter } from "./src/middleware/rate-limiter.js";

const app = express();
const port = process.env.PORT || 8000;

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors()); //change later to only allow frontend to make requests

//Routes
app.use("/api/maps", mapAPI);
app.use("/api/users", limiter, user);
app.use("/api/auth", limiter, auth);
app.use("/api/geocode", geocode);
app.use("/api/astar", pathfinding); //ADD LIMITER IN FUTURE

//Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
