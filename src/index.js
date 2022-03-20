const express = require('express')
const bodyParser = require('body-parser')
const route = require('./Routes/route.js')
const app = express()
const mongoose = require('mongoose')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect("mongodb+srv://group13:UEEqzwKeluhyT2uM@cluster0.hkvjs.mongodb.net/srushtidb?retryWrites=true&w=majority",{
    useNewUrlParser:true
})
.then(()=>console.log("MongoDb connected"))
.catch(err=>console.log(err))
app.use('/',route);

app.listen(process.env.PORT || 3000, function() {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
