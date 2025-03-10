import express from 'express'
import { signup,login, logout } from '../Controllers/user.controller.js'

export function userRoutes(app){
    app.post('/user/signup',signup)
    app.post('/user/login',login)
    app.post('/user/logout',logout)
}