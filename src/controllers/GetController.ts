import { Request, Response } from "express";
import * as UserService from '../services/UserService';

export const home =async (req:Request, res:Response) => {
    res.render('home')
}

export const login = async (req:Request, res:Response) => {
    res.render('login')
}

export const list = async (req:Request, res:Response) => {
    const users = await UserService.allUsers();
    res.status(200).json({user: req.user, totalUsers:users.length});
}