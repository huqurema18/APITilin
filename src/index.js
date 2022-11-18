import app from "./app";
import relleno from "../src/rellenar";

const main=()=>{
    app.listen(app.get("port"));
    console.log(app.get("port"));
    console.log(`Server on port ${app.get("port")}`);
    
    

};

main();

//const operacion = require("./rellenar")
//operacion.relleno()



