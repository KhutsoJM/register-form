import mongoose from "mongoose";
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    callingCode: {
        type: String,
        required: true,
    }
})

export default mongoose.model('Country', countrySchema)