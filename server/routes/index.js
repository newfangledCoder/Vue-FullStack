const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

// Here we will import our custom controllers
const { catchErrors } = require('../utilities/errorHandler');
const usersController = require('../controllers/usersController');


// GET methods

router.get('/api', usersController.Test);

router.get('/api/user', auth, usersController.GetUser);


// POST methods

router.post('/api/register', usersController.Register);

router.post('/api/login', usersController.Login);










module.exports = router;