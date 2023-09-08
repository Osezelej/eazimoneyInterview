import {GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLSchema, GraphQLString} from 'graphql';
// to request all todos
import todoModel from '../model/todo.js';
import userModel from '../model/user.js';


const todoType = new GraphQLObjectType({
    name:'todotype',
    fields:()=>({
        id:{type:GraphQLString},
        title:{type:GraphQLString},
        content:{type:GraphQLString},
        userId:{type:GraphQLString},
        user:{
            type:userType,
            resolve(parent, args){
                return userModel.findById(parent.userId)
            }
        }
    })
})


const userType= new GraphQLObjectType({
    name:'userType',
    fields:()=>({
        userId:{type:GraphQLID},
        username:{type:GraphQLString},
        todos:{
            type:new GraphQLList(todoType),
            resolve:(parent, args)=>{
                let todos = todoModel.find({userId:parent.userId});
                return todos
            }

        }
    })
})
const rootQuery = new GraphQLObjectType({
    name:'rootQuery',
    fields:{
        todo:{
            type:todoType,
            args:{
                id:{type:GraphQLID}
            },
            resolve(parent, args){
                let todos = todoModel.findById(args.id);
                return todos
            }
        },
        user:{
            type:userType,
            args:{
                userId:GraphQLID
            },
            resolve(parent, args){
                return userModel.findById(args.userId)
            }
        },
        users:{
            type:new GraphQLList(userType),
            resolve(parent, args){
                return userModel.find({})
            }
            
        },
        todos:{
            type:new GraphQLList(todoType),
            resolve(parent, args){
                return todoModel.find({})
            }
        }

    }
})

const addTodoType = new GraphQLObjectType({
    name:'addTodoType',
    fields:{
        title:{type:GraphQLString},
        content:{type:GraphQLString},
        userId:{type:GraphQLString},
    }
})

const mutationQuery = new GraphQLObjectType({
    name:'mutationQuery', 
    fields:{
      addTodo:{
        type:addTodoType,
        args:{
            title:{type:new GraphQLNonNull(GraphQLString) },
            content:{type:new GraphQLNonNull(GraphQLString)},
            userId:{type:new GraphQLNonNull(GraphQLString)},
        },
        resolve(parent, args){
           let todo = new todoModel({
            title:args.title,
            content:args.content,
            userId: args.userId
           })
           return todo.save()
        }
      }
    }
})

const schema = new GraphQLSchema({
    query:rootQuery,
    mutation:mutationQuery
})
export default schema
