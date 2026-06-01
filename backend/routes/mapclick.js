import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("click click");
});

export default router;