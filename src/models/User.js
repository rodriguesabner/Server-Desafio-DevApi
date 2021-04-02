import {Schema, model} from 'mongoose'

const UserSchema = new Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
);

export default model('User', UserSchema);