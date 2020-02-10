const mongoose = require('mongoose');

// Importing model
const { Meeting, validateMeeting } = require("../models/meeting"); 


/**
 * @method - POST
 * @param - /register
 * @description - User SignUp
 */
exports.AddMeeting = async (req,res) => {
  const newMeeting = {
      meetingName: req.body.meetingName,
      meetingOwner: req.body.meetingOwner
  };

  const validationResult = validateMeeting(newMeeting);

  if(validationResult.error){
      const errorObject = {
          name: "Error",
          detail: validationResult.error
      }
      res.json(errorObject);
  }
  else{
      const validatedNewMeeting = validationResult.value;
      //const email = validatedNewUser.email;

      // database querry
      try {
          // let meeting = await User.findOne({
          //     email
          // });
          // if (user) {
          //     return res.status(400).json({
          //         msg: "User Already Exists"
          //     });
          // }

          let meeting = new Meeting(validatedNewMeeting);

          // const salt = await bcrypt.genSalt(10);
          // user.password = await bcrypt.hash(validatedNewUser.password, salt);

          await meeting.save();

          //sending response
          const payload = {
              meeting: {
                  id: meeting.id
              }
          };

          res.json(payload);
          // jwt.sign(
          //     payload,
          //     "randomString", {
          //         expiresIn: 10000
          //     },
          //     (err, token) => {
          //         if (err) throw err;
          //         res.status(200).json({
          //             token
          //         });
          //     }
          // );
      }
      catch (err) {
          console.log(err.message);
          res.status(500).send("Error in Adding Meeting");
      }

  }
};

/**
 * @method - GET
 * @description - Get all the meetings of a meeting owner
 * @param - /meetings
 */
exports.GetMeetingsByOwner = async (req, res) => {
  try {
          // request.user is getting fetched from Middleware after token authentication
          let meetings = [];
          await Meeting.find({ 'meetingOwner': req.params.ownerId }, (err, docs) => {
            if(err){
              res.status(401).send("Can not find documents");
            }

            meetings = docs;
          });

          res.json(meetings);
    }
    catch (e) {
      res.send({ message: "Error in Fetching user" });
  }
}