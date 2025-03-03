import express from 'express'
import connectToDatabase from './Connection/mongoDb.js'

const app = express()
const port = 4000
app.use(express.json())

app.get('/', (req,res) =>{
    res.send('Hey')
})

app.listen(port, async ()=>{
    console.log(`Server is Running at port no: ${port}`)
    await connectToDatabase()

})

export default app