import { Request, Response } from "express";
import User from '../models/User'

export const home =async (req:Request, res:Response) => {
    res.render('home')
}

export const login = async (req:Request, res:Response) => {
    res.render('login')
}

export const list = async (req:Request, res:Response) => {
    
    res.status(200).json({user: req.user});
   
}