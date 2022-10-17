import User from '../models/User'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const creatUser = async (name:string, email:string, password:string) => {
    let hasUser = await User.findOne({email});

    if(!hasUser){
        let newUser = await new User({name, email, password:bcrypt.hashSync(password, 12)}).save()
        return newUser;
    } else{
        return new Error('Esse email já está em uso')
    }
}

export const findByEmail = async (email:string) => {
    return await User.findOne({email});
}

export const GenToken = async (data:object, secret_key:string) => {
    const token = jwt.sign(data, secret_key);
    return token;
}

export const matchPassword = async (password:string, encrypted:string) => {
    return bcrypt.compareSync(password, encrypted);
}

export const allUsers = async () => {
    return await User.find({});
}

