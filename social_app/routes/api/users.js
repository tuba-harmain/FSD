const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');

router.post('/',[
    body('name', 'Name is required')
    .not()
    .isEmpty(),

    body('email', 'Please enter a valid Email')
    .isEmail(),

    body('password', 'Please enter  password with 6 or more chars')
    .isLength({ min: 6 })
], 
(req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() });
    }

    res.send ('User Route');
});

module.exports = router;