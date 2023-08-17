const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/iNotebook"

const db = mongoose.connection;

const connectToMongo = ()=>{
    if (db.readyState === 1) {
        console.log('Already connected to MongoDB');
    } else {
        console.log('Not connected to MongoDB');
        console.log('Connecting to MongoDB...');
        mongoose.connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });

        db.on('connected', () => {
            console.log('Success! - Connected to MongoDB');
        });

        db.on('error', (error) => {
            console.error('MongoDB connection error:', error.constructor.name);
        });
    }

}

module.exports = connectToMongo;