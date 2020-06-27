import express from "express";
import compression from "compression";
import index from "./ssr/routes/index";
import path from "path";

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
app.use("/", index);

const port = process.env.PORT || 3000;

app.listen(port, function listenHandler() {
    console.info(`Running on ${port}`)
});
