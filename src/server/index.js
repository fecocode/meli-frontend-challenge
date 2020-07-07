import express from "express";
import compression from "compression";
import path from "path";

import api from './api';
import ssr from './ssr';

// Extrae las rutas de la api
const { routes : apiRoutes } = api;
// Extrae las rutas de SSR
const { routes : ssrRoutes } = ssr;


// Instacia servidor
const app = express();

// Configura el motor de vistas SSR
app.set("views", path.join(__dirname,"views"));
app.set("view engine", "ejs");


// Middleware
app.use(compression());
console.log(__dirname);
app.use(express.static(__dirname + "/public"));

// Rutas
app.use("/", ssrRoutes);
app.use("/api", apiRoutes);

const port = process.env.PORT || 3000;

app.listen(port, function listenHandler() {
    console.info(`Running on ${port}`);
});
