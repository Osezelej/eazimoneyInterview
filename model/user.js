import mongoose from "mongoose";
const {Schema, model} = mongoose;


const userSchema = new Schema({
    username:String,
    password:String
})

const userModel = model('user', userSchema)
export default userModel;