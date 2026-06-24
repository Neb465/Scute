import express from "express";

import mapAPI from "./routes/mapAPI.js";
import user from "./routes/user.js";

import errorHandler from "./middleware/error.js";
import notFound from "./middleware/notFound.js";

const app = express();
const port = process.env.PORT || 6767;

//Middleware
app.use(express.json());

//Routes
app.use("/api/maps", mapAPI);
app.use("/api/users", user);

//Error Handler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
