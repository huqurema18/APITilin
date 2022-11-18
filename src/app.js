import express from "express";
import morgan from "morgan";
// Routes
import languageRoutes from "./routes/language.routes";
const cors=require('cors');

const app = express();

app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
    
// Settings
app.set("port", 4010);

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/languages", languageRoutes).use(cors());





export default app;
