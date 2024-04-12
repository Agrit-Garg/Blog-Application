import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    uid: {
        type: String,
        require: true,
    },
    author: {
        type: String,
        require: true,
    },
    comment: {
        type: String,
        require: true,
    },
    postId: {
        type: String,
        require: true,
    }
}, { timestamps: true })

export default mongoose.model('Comment', commentSchema);