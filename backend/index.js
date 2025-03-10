import express from 'express'
import connectToDatabase from './Connection/mongoDb.js'
import cookieParser from 'cookie-parser'

import { userRoutes } from './Routes/user.routes.js'
import { videoRoutes } from './Routes/video.routes.js'
import { commentRoutes } from './Routes/comment.routes.js'

const app = express()
const port = 4000
app.use(express.json())
app.use(cookieParser())

app.get('/', (req,res) =>{
    res.send('Hey')
})

app.listen(port, async ()=>{
    console.log(`Server is Running at port no: ${port}`)
    await connectToDatabase()

})

userRoutes(app)
videoRoutes(app)
commentRoutes(app)

export default app