import mongoose from "mongoose";
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum:["student", "recruiter"],
        required: true,
    },
    profile: {
        bio: {type: String},
        skills: [{type: String}],
        resume: {type: String},
        resumeOriginalName: {type: String},
        company:{type:Schema.Types.ObjectId, ref: "Company"},
        profilePhoto: {
            type: String,
            default:""
        }
    },
    // createdAt: {
    //     type: Date,
    //     default: Date.now,
    // }
},{timestamps: true});

export const User = mongoose.model('User', userSchema);

