import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";

import user from "./src/routes/user.js";
import auth from "./src/routes/auth.js";
import geocode from "./src/routes/geocode.js";
import pathfinding from "./src/routes/pathfinding.js";

import errorHandler from "./src/middleware/error-handler.js";
import notFound from "./src/middleware/not-found.js";
import { limiter } from "./src/middleware/rate-limiter.js";
import { identifyUser } from "./src/middleware/auth/identification-handler.js";

const app = express();
const port = process.env.PORT || 8000;

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(cors({
	origin: process.env.FRONTEND_URL || "http://localhost:5173",
	credentials: true
}));
app.use(identifyUser);

//Routes
app.use("/api/users", limiter, user);
app.use("/api/auth", limiter, auth);
app.use("/api/geocode", geocode);
app.use("/api/astar", pathfinding);

//Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
