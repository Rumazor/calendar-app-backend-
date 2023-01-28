const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN);
    console.log("DB Online");
  } catch (error) {
    console.log(error);
    throw new Error("Error a la hora de inicializar database");
  }
};

module.exports = {
  dbConnection,
};
