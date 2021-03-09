const User = require('../models/user');
const bcrypt = require('bcryptjs');
const errors = require('restify-errors');
const Auth = require('../auth');
const jwt = require('jsonwebtoken');

const ConfigFile = require('../config');


module.exports = function(server) {

    server.post('/auth', async(req, res, next) => {

        const { email, password } = req.body;
        try {
            //Authenticate user
            const user = await Auth.authenticate(email, password);
            console.log(user)
            const token = await jwt.sign(user.toJSON(), ConfigFile.JWT_SECRET, { expiresIn: '15m' })
            const { iat, exp } = jwt.decode(token);
            console.log(token)
                // responding the token 
            res.send({ iat, exp, token });
            next();
        } catch (error) {
            // user unauthorized 
            return next(new errors.UnauthorizedError(error));

        }
    })

    server.post('/register', async(req, res, next) => {
        const { email, password } = req.body;

        const newUser = new User({ email, password });
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, async(err, hash) => {
                //after hashing the password
                newUser.password = hash;
                try {
                    const aftersavingtodatabase = await newUser.save();
                    res.send(201);
                    next();
                } catch (error) {
                    return next(new errors.InternalError(error.message))
                }
            })
        })

    });


}