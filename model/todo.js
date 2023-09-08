import mongoose from "mongoose";
const {Schema, model} = mongoose;


const TodoSchema = new Schema({
    title:String,
    content:String,
    userId:String
})

const todoModel = model('todo', TodoSchema)
export default todoModel;