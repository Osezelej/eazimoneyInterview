import mongoose from "mongoose";
const {Schema, model} = mongoose;


const userSchema = new Schema({
    username:String,
    password:String
})

const userModel = model('todos', userSchema)
export default userModel;