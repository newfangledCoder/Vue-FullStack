const mongoose = require('mongoose');
const Joi = require('joi');

const meetingSchema = new mongoose.Schema({
  meetingName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 250
  },
  meetingOwner: {
    type: String,
    required: true
  },
  starts: {
    type: Date
  },
  ends: {
    type: Date
  },
  meetingRoom: {
    type: String
  }
});

// function to validate a user model
function validateMeeting(meeting) {
  const schema = {
    meetingName: Joi.string().min(5).max(250).required(),
    meetingOwner: Joi.string().required(),
  };

  return Joi.validate(meeting, schema);
}

exports.Meeting = mongoose.model("Meeting", meetingSchema);
exports.validateMeeting = validateMeeting;