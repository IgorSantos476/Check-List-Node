const mongoose = require('mongoose');

async function ConnectDB() {
    const URI = process.env.DB_URI

    try {
        await mongoose.connect(URI);
        console.log('MongoDB Connected...');

    } catch(error) {
        console.log(error);
    }
}

module.exports = ConnectDB;