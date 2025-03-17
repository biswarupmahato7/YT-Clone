import express from 'express'
// import connectToDatabase from './Connection/mongoDb.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

import { userRoutes } from './Routes/user.routes.js'
import { videoRoutes } from './Routes/video.routes.js'
import { commentRoutes } from './Routes/comment.routes.js'
import './Connection/mongoDb.js'

const app = express()
const port = 4000

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}))

app.use(express.json())
app.use(cookieParser())

app.get('/', (req,res) =>{
    res.send('Hey')
})

app.listen(port, async ()=>{
    console.log(`Server is Running at port no: ${port}`)
   

})

userRoutes(app)
videoRoutes(app)
commentRoutes(app)

export default app