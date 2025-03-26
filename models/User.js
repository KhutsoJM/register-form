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
    birthdate: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        enum: ['M', 'F', 'Other'],
        required: true,
    },
    learner: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Learner',
    }]

}, { timestamps: true })

export default mongoose.model('User', userSchema)