import mongoose from 'mongoose';

const chatieSchema = mongoose.Schema({
    roomID : String,
    Users : Array,
    messageList : Array
})

export default mongoose.model('chaties', chatieSchema);

//users : array