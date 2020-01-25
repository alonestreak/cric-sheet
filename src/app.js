// const express = require('express')
// require('./db/mongoose')
// const userRouter = require('./routers/user')
// const taskRouter = require('./routers/task')

// const app = express()

// app.use(express.json())
// app.use(userRouter)
// app.use(taskRouter)

// module.exports = app

const express = require('express')
const bodyParser = require('body-parser');
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
// const multer= require('multer')
const app = express()

app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: false
  }));
app.use(bodyParser.json({limit: "5mb"}));
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app
