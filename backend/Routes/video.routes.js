import express from 'express'
import {uploadVideo,getAllVideo, getVideoById, getAllVideoByUserId} from '../Controllers/video.controller.js'
import auth from '../middleware/authentication.js'

export function videoRoutes(app){
    app.post('/upload/video',auth ,uploadVideo)
    app.get('/allVideo',getAllVideo)
    app.get('/getVideoById/:id',getVideoById)
    app.get('/:userId/channel', getAllVideoByUserId)

}