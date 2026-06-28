import express from "express";

import cookieParser from "cookie-parser";
import cors from "cors";
import { rateLimit } from "express-rate-limit";

import mapAPI from "./src/routes/mapAPI.js";
import user from "./src/routes/user.js";
import auth from "./src/routes/auth.js";

import errorHandler from "./src/middleware/error-handler.js";
import notFound from "./src/middleware/not-found.js";

const app = express();
const port = process.env.PORT || 8000;

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	ipv6Subnet: 56, // Set to 60 or 64 to be less aggressive, or 52 or 48 to be more aggressive
	// store: ... , // Redis, Memcached, etc. See below.
})

//Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors()); //change later to only allow frontend to make requests
app.use()

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
