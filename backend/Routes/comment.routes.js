import express from 'express'
import { addComment, getCommentByVideoId } from '../Controllers/comment.controller.js'
import auth from '../middleware/authentication.js'


export function commentRoutes(app){
  app.post('/comment',auth, addComment)
  app.get('/comment/:videoId', getCommentByVideoId)
}