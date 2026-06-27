import express from "express";
import cookieParser from "cookie-parser";

import mapAPI from "./routes/mapAPI.js";
import user from "./routes/user.js";
import auth from "./routes/auth.js";

import errorHandler from "./middleware/errorHandler.js";
import notFound from "./middleware/notFound.js";

const app = express();
const port = process.env.PORT || 6767;

//Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/maps", mapAPI);
app.use("/api/users", user);
app.use("/api/auth", auth);

//Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
