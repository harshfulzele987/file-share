const  express = require('express')
const app = express();
const path = require('path');


app.use(express.json());

app.use(express.static('public'));

//template engin
app.set('views', path.join(__dirname ,'/views'))
app.set('view engine' ,'ejs');


//Routes
app.use('/' ,require('./index'));
app.use('/api/files', require('./route/files'));
app.use('/files' ,require('./route/show'));
app.use('/files/download',require('./route/download'));



//Connection with dataBase
const connectDB = require('./config/db');
connectDB();

//Connecting to server
const port = process.env.port || 3000;

app.listen(port, () => console.log(`Listing on port ${port}`))