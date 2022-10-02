import { Schema, model } from 'mongoose';

interface User{
    name:String,
    email:String,
    password:String
}

const userSchema = new Schema<User>({
    name:{type:String, required:true, minlength:3, maxlength:40},
    email:{type:String, required:true, minlength:5, maxlength:40},
    password:{type:String, required:true, minlength:3, maxlength:80}
})


export default model<User>('User', userSchema);