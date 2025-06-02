import mongoose from 'mongoose'
const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    birthdate: {
        type: String,
        // required: true,
    },
    country: {
        type: String,
        reqiured: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    postalCode: {
        type: String,
        reqiured: true,
    },
    callingCode: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    nationality: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'Other'],
    },
    enrolling: {
        type: Number,
        required: true,
    },
    learners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Learner',
    }]

}, { timestamps: true })

export default mongoose.model('User', userSchema)