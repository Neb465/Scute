import express from "express";
import search from "./routes/search.js";
import mapclick from "./routes/mapclick.js";

const app = express();
const port = process.env.PORT || 6767;

//Middleware
app.use(express.json());

//Routes
app.use("/api/search", search);
app.use("/api/mapclick", mapclick);

app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
