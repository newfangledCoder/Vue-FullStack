const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { check, validationResult} = require("express-validator/check");

const { User, validateUser } = require("../models/user");

// Test Method
exports.Test = (req, res) => {
    
    res.json({
        name: "NodeJS is fun!!"
    });
};

/**
 * @method - GET
 * @description - Get LoggedIn User
 * @param - /user/me
 */
exports.GetUser = async (req, res) => {
    try {
            // request.user is getting fetched from Middleware after token authentication
            const user = await User.findById(req.user.id);
            res.json(user);
      }
      catch (e) {
        res.send({ message: "Error in Fetching user" });
    }
}

/**
 * @method - POST
 * @param - /register
 * @description - User SignUp
 */
exports.Register = async (req,res) => {
    const newUser = {
        name: req.body.displayName,
        email: req.body.email,
        password: req.body.password
    };

    const validationResult = validateUser(newUser);

    if(validationResult.error){
        const errorObject = {
            name: "Error",
            detail: validationResult.error
        }
        res.json(errorObject);
    }
    else{
        const validatedNewUser = validationResult.value;
        const email = validatedNewUser.email;

        // database querry
        try {
            let user = await User.findOne({
                email
            });
            if (user) {
                return res.status(400).json({
                    msg: "User Already Exists"
                });
            }

            user = new User(validatedNewUser);

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(validatedNewUser.password, salt);

            await user.save();

            //sending response
            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload,
                "randomString", {
                    expiresIn: 10000
                },
                (err, token) => {
                    if (err) throw err;
                    res.status(200).json({
                        token
                    });
                }
            );
        }
        catch (err) {
            console.log(err.message);
            res.status(500).send("Error in Saving");
        }

    }
};

/**
 * @method - POST
 * @param - /login
 * @description - User login
 */
exports.Login = async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({email});

        if(!user){
            res.status(400).json({
                message: "user does not exist"
            })
        }

        const isMatch = bcrypt.compare(password, user.password);

        if(!isMatch){
            res.status(400).json({
                message: "Incorrect Password!!"
            });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            "secret",
            {
                expiresIn: 5000
            },
            (err, token) => {
                if (err) throw err;
                res.status(200).json({
                  token
                });
              }
        );
    }
    catch (e) {
        console.error(e);
        res.status(500).json({
            message: "Server Error"
        });
    }
};