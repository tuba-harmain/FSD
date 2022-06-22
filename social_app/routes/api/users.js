const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { body, validationResult } = require('express-validator');

const { User }  = require('../../models/User');

// @route POST  api/users
// @desc Register user
// @access Public

router.post('/',[
    body('name', 'Name is required')
    .not()
    .isEmpty(),

    body('email', 'Please enter a valid Email')
    .isEmail(),

    body('password', 'Please enter  password with 6 or more chars')
    .isLength({ min: 6 })
], 
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password} = req.body;

    try{
        // See if User exists
        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({ errors: [{ msg : "User already exists!" }] });
        }

        // Get Users Gravator
        const avatar = normalize(
            gravatar.url(email, {
              s: '200',
              r: 'pg',
              d: 'mm'
            }),
            { forceHttps: true }
          );

        user = new User ({
            name,
            email,
            avatar,
            password
        });

        // Encrypt Password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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
        res.status(500).send('Server Error')
    }

});

module.exports = router;