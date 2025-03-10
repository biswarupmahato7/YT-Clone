import mongoose from "mongoose";

const commentsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    video:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Video',
        required: true
    },
    message: {
        type : String,
        required :true
    }


},{ timestamps: true })

const commentsModel = mongoose.model('Comments', commentsSchema)
export default commentsModel;