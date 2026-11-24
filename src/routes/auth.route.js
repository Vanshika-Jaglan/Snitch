import express from "express";
import { registerValidator, loginValidator } from "../validators/auth.validator.js";
import { register, login, refresh} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register",registerValidator, register);

router.post("/login", loginValidator, login);

router.post("/refresh", refresh);

//User that is currently loggedIn 
//router.get("/me", getMe)

export default router;