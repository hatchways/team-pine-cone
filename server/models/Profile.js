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

profileSchema.pre('save', next => {
    this.availability.forEach(range => {
        const isNegativeRange = range.end < range.start
        if (isNegativeRange) { throw new Error('Date ranges must have a start date before the end date') }
    })
    const today = new Date()
    const isUnderEighteen = today.getFullYear() - this.birthDate.getFullYear() < 18
    if (isUnderEighteen) { throw new Error('User must be 18 years old') }
    next()
})

const Profile = model("Profile", profileSchema)

module.exports = Profile