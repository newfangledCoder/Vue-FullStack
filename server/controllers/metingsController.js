const mongoose = require('mongoose');

// Importing model
const { Meeting, validateMeeting } = require("../models/meeting"); 
const {User} = require("../models/user");


/**
 * @method - POST
 * @param - /register
 * @description - User SignUp
 */
exports.AddMeeting = async (req,res) => {
  console.log("from controller---------->", req.user);
  const ownerId = req.user.id;
  const ownerExists = await User.exists({"_id": ownerId});
  if(!ownerExists){
    res.status(400).send();
  }

  const newMeeting = {
      meetingName: req.body.meetingName,
      meetingOwner: ownerId
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
  const ownerId = req.user.id;
  const ownerExists = await User.exists({"_id": ownerId});
  if(!ownerExists){
    res.status(400).send();
  }

  try {
          // request.user is getting fetched from Middleware after token authentication
          let meetings = [];
          await Meeting.find({ 'meetingOwner': ownerId }, (err, docs) => {
            if(err){
              res.status(401).send("Can not find documents");
            }

            meetings = docs;
          });

          res.status(200).send(meetings);
    }
    catch (e) {
      res.send({ message: "Error in Fetching user" });
  }
}

/**
 * @method - DELETE
 * @description - Deletes a meeting
 * @param - /user/delete/meeting
 */
exports.DeleteMeeting = async (req,res) => {
  const ownerId = req.user.id;
  const ownerExists = await User.exists({"_id": ownerId});
  if(!ownerExists){
    res.status(400).send();
  }

  try {
    //console.log("meeting id------------>", req.params);
    const deletedMeeting = await Meeting.deleteOne({_id: req.params.meetingId}, (err, id) =>{
      if(err){
        res.status(400).send(err);
      }
      else{
        res.status(200).send(id);
      }
    })
  } 
  catch (error) {
    res.send({ message: "Error deleteing meeting" });
  }
}

exports.GetAllMeetings = async (req, res) => {
  console.log("ALL THE MEETINGS........");

  try {
        let meetings = [];

        await Meeting.aggregate([
          { "$addFields": { "userId": { "$toObjectId": "$meetingOwner" }}},
          { "$lookup": {
            "from": "users",
            "localField": "userId",
            "foreignField": "_id",
            "as": "owner"}
          }],
          (err, docs) => {
            if(err){
              res.status(401).send("Can not find documents");
            }
            //console.log(docs);
            meetings = docs.map(function(x) {
              return {
                meetingName: x.meetingName,
                id: x._id,
                owner: x.owner[0].name,
                meetingOwner: x.meetingOwner
              }
            })
        });

        res.status(200).send(meetings);
  }
    catch (e)
    {
      res.send({ message: "Error in Fetching user" });
    }
}