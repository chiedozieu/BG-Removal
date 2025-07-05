import express from "express"
import cors from "cors"
import 'dotenv/config'
import connectDB from "./configs/mongodb.js"
import userRouter from "./routes/user.routes.js"
import imageRouter from "./routes/image.route.js"


const PORT = process.env.PORT || 4000
const app = express()
connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello Nabata!")
})
app.use('/api/user', userRouter)
app.use('/api/image', imageRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})