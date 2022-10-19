const express = require('express')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000

const { errorHandler } = require('./middleware/errorMiddleware')

const app = express()
// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(errorHandler)

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Welcome to Support Desk API',
  })
})

// Routes
app.use('/api/users', require('./routes/userRoutes'))

app.listen(PORT, () => console.log(`server started on port : ${PORT}`))
