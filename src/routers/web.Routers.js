import express, { Router } from 'express'
import { realTimeProductsWeb , homeWeb } from '../controllers/web.Constrollers.js'



export const webRouter=new Router()

webRouter.get('/realTimeProducts',realTimeProductsWeb)
webRouter.get('/',homeWeb)
