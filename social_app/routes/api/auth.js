const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');

const User = require('../../models/User');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/',
[
    body('email', 'Please enter a valid Email')
    .isEmail(),

    body('password', 'Password is required')
    .exists()
], 
async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password} = req.body;

    try {
        // See if User exists
        let user = await User.findOne({email});

        if (!user) {
            return res.status(400).json({ msg : "Invalid Credentials!" });
        }

        // Checking Password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg : "Invalid Credentials!" });
        }

        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload, 
            config.get("jwttoken"),
            {expiresIn: 3600000 }, 
            (err, token) => {
                if(err) throw err;
                res.json({ token });
            });

    } catch(err) { 
        console.error(err.message);
        res.status(500).send('Serve Error')
    }

});



module.exports = router;