import mongoose from 'mongoose'
const Schema = mongoose.Schema

const learnerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    birthdate: {
        type: String,
        required: true,
    },
    school: {
        type: String,
    },
    venue: {
        type: String,
        required: true,
    },
    note: {
        type: String,
    },

}, { timestamps: true })

export default mongoose.model('Learner', learnerSchema)