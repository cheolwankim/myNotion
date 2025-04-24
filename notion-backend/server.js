const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')

dotenv.config()
const app = express()

app.use(cors())
app.use(express.json())

// routes
app.use('/auth', require('./routes/authRoutes'))
app.use('/api/docs', require('./routes/docRoutes'));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`✅ Server running on http://localhost:${process.env.PORT}`)
    )
  })
  .catch(err => console.log(err))
