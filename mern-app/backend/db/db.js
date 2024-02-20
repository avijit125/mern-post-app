const mongoose = require("mongoose")

const connectToDB = async () =>{
    try {
        await mongoose.connect("",{
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = connectToDB