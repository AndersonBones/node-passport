import express, { Router } from "express";
import * as PostController from '../controllers/PostController';
import * as GetController from '../controllers/GetController';
import {privateAuth} from '../config/passport'

const router = Router();

router.get('/', GetController.home)
router.get('/login', GetController.login)

router.get('/list', privateAuth, GetController.list)


router.post('/login', express.urlencoded({extended:true}), PostController.login)
router.post('/register', express.urlencoded({extended:true}), PostController.register)



export default router