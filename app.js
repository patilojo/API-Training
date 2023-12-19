//Importación de dependencias
import express from 'express';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import useDb from './src/db/useDb.js';
import {
  handleError,
  notFound,
 
} from './src/middlewares/index.js';
import { SERVER_PORT, SERVER_HOST } from './env.js';

import {userRoutes, trainingRoutes, likeRoutes, favRoutes, sortRoutes} from './src/routes/index.js'


const app = express();
// middlware que analiza los cuerpos de las solicitudes en formato JSON
app.use(express.json());

//middleware de fileupolad para manejar solicitudes que contenga archivos adjuntos
app.use(fileUpload());

//middlewares de morgan , infromación sobre las solicitudes HTTP que llegan al servidor 
app.use(morgan('dev'));

// Selección de base de datos en la que trabajamos
useDb();

//Rutas

app.use(userRoutes);
app.use(trainingRoutes);
app.use(likeRoutes);
app.use(favRoutes);
app.use(sortRoutes);


//middlewares de manejo de errores y pagina no encontrada

app.use(notFound);
app.use(handleError);

//Inicialización del servidor
app.listen(SERVER_PORT, () => {
  console.log(`Servidor escuchando en la dirección ${SERVER_HOST}:${SERVER_PORT}`);
});
