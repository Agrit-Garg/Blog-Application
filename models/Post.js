import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    uid: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
    },
    title: {
        type: String,
        require: true,
    },
    photo: {
        type: String,

    },
    category: {
        type: Array,
    },
    desc: {
        type: String,
        require: true,
    },
}, { timestamps: true })

export default mongoose.model('Post', postSchema);