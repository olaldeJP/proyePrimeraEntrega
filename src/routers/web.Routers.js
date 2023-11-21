import express, { Router } from 'express'
import { formularioWeb, productosWeb } from '../controllers/web.Constrollers.js'



export const webRouter=new Router()

webRouter.get('/',formularioWeb)
webRouter.get('/productos',productosWeb)