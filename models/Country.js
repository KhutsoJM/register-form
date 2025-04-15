import mongoose from "mongoose";
const Schema = mongoose.Schema;

const countrySchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    demonym: {
        type: String,
        reqiured: true,
    },
    callingCode: {
        type: String,
        required: true,
    }
})

export default mongoose.model('Country', countrySchema)