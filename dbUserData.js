import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    uname : String,
    pwd : String
})

export default mongoose.model('user', UserSchema);