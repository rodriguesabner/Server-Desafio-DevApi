import {Schema, model} from 'mongoose'

const ConectorSchema = new Schema({
    name: String,
    type: String,
    privacy: String,
    base_url: String,
    logo_url: String,
    category: String,
    description: String,
    status: {
        type: Boolean,
        select: false
    },
}, {
    timestamps: true
});

export default model('Conector', ConectorSchema);