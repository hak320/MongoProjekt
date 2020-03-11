if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')

const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views',__dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL, {    useNewUrlParser: true, useUnifiedTopology: true} ,function(err,db){
  if(err){
    console.log('errrrr')
  }else{
    const db = mongoose.connetion
    db.on('error', error => console.error(error))
    db.once('open', () => console.log('Connected to Mongoose'))
    console.log('gut')
  }
})

//mongoose.connect('mongodb://127.0.0.1:27017/MyBrary', {    useNewUrlParser: true, useUnifiedTopology: true})
//const db = mongoose.connetion
//db.on('error', error => console.error(error))
//db.once('open', () => console.log('Connected to Mongoose'))

app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)
