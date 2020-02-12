const mongoose = require('mongoose');

// Importing model
const { Attendee, validateAttendee } = require("../models/attendee"); 
const { Meeting } = require("../models/meeting");



/**
 * @method - POST
 * @param - /add/attendee
 * @description - Adding attendee
 */
exports.AddAttendee = async (req, res) => {

  const newAttendee = {
    meetingId: req.body.meetingId,
    name: req.body.name,
    email: req.body.email
  }

  const validationResult = validateAttendee(newAttendee);

  if(validationResult.error){
      const errorObject = {
          name: "Error",
          detail: validationResult.error
      }
      res.json(errorObject);
  }
  else{
      const validatedNewAttendee = validationResult.value;

      // database querry
      try {

          let attendee = new Attendee(validatedNewAttendee);

          await attendee.save();

          //sending response
          const payload = {
            attendee: {
                  id: attendee.id
              }
          };

          res.json(payload);
      }
      catch (err) {
          console.log(err.message);
          res.status(500).send("Error in Adding Attendee");
      }

  }
  console.log("hello from attendee------------->", newAttendee);
};

/**
 * @method - GET
 * @param - /attendee
 * @description - return attendees
 */
exports.GetAllAttendees = async (req, res) => {
    try {
        let attendees = [];
        
        await Attendee.find((err, docs) => {
            if(err){
                res.status(401).send("Can not find documents");
              }
              //console.log(docs);
            attendees = docs;
        });

        res.status(200).send(attendees);
  }
    catch (e)
    {
      res.send({ message: "Error in Fetching user" });
    }
};