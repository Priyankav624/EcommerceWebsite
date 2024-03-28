import mongoose from "mongoose";

// how users look alike   and properties
const userSchema = mongoose.Schema(
    {
    username: {
        type : String,
        required : true,
    },
    email: {
        type : String,
        required : true,
        unquie: true,
    },
    password: {
        type : String,
        required : true,
    },
    isAdmin: {
        type : Boolean,
        required : true,
        default : false,
    },
 },
 { timestamps: true }         // when we create or delete it gives that specific time
);

//model 

const User = mongoose.model('User' , userSchema);

export default User;
