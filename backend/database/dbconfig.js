const mongoose = require("mongoose");


exports.dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
    });
    console.log("MongoDB Connected to " + mongoose.connection.name);
  } catch (error) {
    console.log(error.message);
    throw new Error('Error a la hora de iniciar la DB.Ver logs')
  }
};
