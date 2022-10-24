const express = require('express')
const path = require('path')
require('colors')
require('dotenv').config()
const PORT = process.env.PORT || 5000
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')

// Connect to Database
connectDB()

const app = express()
// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

// Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// Serve FE
if (process.env.NODE_ENV === 'production') {
  // Set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'))
  })
} else {
  app.get('/', (_, res) => {
    res.status(200).json({ message: 'Welcome to the Support Desk API' })
  })
}

app.use(errorHandler)
app.listen(PORT, () => console.log(`server started on port : ${PORT}`))
