import express from "express";
const router = express.Router();

//@route  GET api/auth
//@desc   Test Route
//@access Public
router.get('/', (req , res) => res.send('Auth route'));

//@route GET api/auth
//@desc Register Route
//@access Public
router.get('/register', (req , res) => res.send('Auth Register route'));

export default router