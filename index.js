const express = require("express");
require("dotenv").config();

const { dbConnection } = require("./db/config");
cors = require("cors");
//crear el servidor
const app = express();

//Database
dbConnection();

//CORS
app.use(cors());

// MIDDLEWARES
//Directorio publico
app.use(express.static("public"));
// Lectura y parseo del body
app.use(express.json());

// RUTAS
// todo lo que este archivo a exportar lo va habilitar en esta ruta
app.use("/api/auth", require("./routes/auth"));

//excuchar peticion
app.listen(process.env.PORT, () => {
  console.log(`Servidor en el puerto ${process.env.PORT}`);
});
