import mongoose from 'mongoose';

export default () => {
    // const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://tabner123:tabner@123@events.h0brf.mongodb.net/events?retryWrites=true&w=majority";
    mongoose.connect(uri, {useNewUrlParser: true}, function(err){
        if(err) console.error(err);
    });
    
}