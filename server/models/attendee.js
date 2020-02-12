const mongoose = require('mongoose');
const Joi = require('joi');

const attendeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    checkedInAt: {
        type: Date,
        default: Date.now()
    },
    meetingId: {
      type: String,
      required: true
    }
});

// function to validate a user model
function validateAttendee(attendee) {
    const schema = {
        name: Joi.string().min(4).max(50).required(),
        email: Joi.string().required().email(),
        meetingId: Joi.string().required()
    };

    return Joi.validate(attendee, schema);
}

exports.Attendee = mongoose.model("Attendee", attendeeSchema);
exports.validateAttendee = validateAttendee;
