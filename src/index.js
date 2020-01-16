const express = require('express')
const bodyParser = require('body-parser');
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const multer= require('multer')


const app = express()
const port = process.env.PORT 


app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: false
  }));
app.use(bodyParser.json({limit: "5mb"}));
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

