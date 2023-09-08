import  express from "express";
import { createHandler } from 'graphql-http/lib/use/express';
import schema from "./schema/schema.js";
import mongoose from "mongoose";
import userModel from "./model/user.js";

const app1 = express()

// mongoose connection to mongodb database
mongoose.connect('mongodb://atlas-sql-64649c328de8402cb1dfe594-ni51f.a.query.mongodb.net/Agric_Fresh?ssl=true&authSource=admin')
mongoose.connection.once('open', ()=>{
    console.log('connection to the database ready')
})


app1.all('/graphql',  createHandler({schema}));

app1.post('/login', (req, res)=>{
    userModel.find({username:req.body['username'], password:req.body['password']})
    res.send(req.body)
})
app1.post('/signup', (req, res)=>{
   let data =  req.body
   console.log(data)
   let newUser = new userModel({
    ...data
   })
   newUser.save()
   return data
})
app1.listen(4000, ()=>{
    console.log('connection to server successful')
})