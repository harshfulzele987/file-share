require('dotenv').config();
const mongoose = require('mongoose');
function connectDB() {
    // Database connection 
    mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true,  useUnifiedTopology: true });
    const connection = mongoose.connection;
   // const connection = mongoose.connection;
    connection.once('open', (err) => {
        if(err){
            console.log('Database connection failure');
        }else{
            console.log('Database opened');
    
        }  
    });
}


// mIAY0a6u1ByJsWWZ

module.exports = connectDB;
