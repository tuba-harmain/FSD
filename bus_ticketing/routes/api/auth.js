import express from "express";
import { login, register } from "../../controllers/auth.js";
const router = express.Router();


//@route GET api/auth
//@desc Register Route
//@access Public
router.post('/register', register );

router.post('/login', login );

export default router