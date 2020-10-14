const { Schema, model } = require('mongoose');

const profileSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'non-binary', 'other', 'prefer not to say'],
        default: 'prefer not to say'
    },
    birthDate: {
        type: Date
    },
    description: {
        type: String
    },
    availability: [
        {
            start: {
                type: Date,
                required: true
            },
            end: {
                type: Date,
                required: true
            }
        }
    ]
})

const Profile = model("Profile", profileSchema)

module.exports = Profile