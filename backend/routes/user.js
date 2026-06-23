import express from "express";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/", updateUserInfo);
router.delete("/", deleteUser);

export default router;
