const express = require('express');
const router = express.Router();
const auth = require("../middleware/auth");

// Here we will import our custom controllers
const { catchErrors } = require('../utilities/errorHandler');
const usersController = require('../controllers/usersController');
const meetingsController = require("../controllers/metingsController");
const attendeeController = require("../controllers/attendeeController");


// GET methods

router.get('/api', usersController.Test);

router.get('/api/user', auth, usersController.GetUser);

router.get('/api/user/meetings/', auth, meetingsController.GetMeetingsByOwner)

router.get('/api/meetings', meetingsController.GetAllMeetings);

router.get('/api/attendes', attendeeController.GetAllAttendees);


// POST methods

router.post('/api/register', usersController.Register);

router.post('/api/login', usersController.Login);

router.post('/api/add/meeting', auth, meetingsController.AddMeeting);

router.post('/api/add/attendee', attendeeController.AddAttendee);


// DELETE methods
router.delete('/api/user/meetings/delete/:meetingId', auth, meetingsController.DeleteMeeting);







module.exports = router;