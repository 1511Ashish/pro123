const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () =>{
    mongoose.connect(process.env.DB_URL)
    .then(() => {
        console.log("Connection Successful");
    })
    .catch((error) => {
        console.log("Connection failed");
        console.log(error.message);
        process.exit(1);
    })
}
module.exports = dbConnect;