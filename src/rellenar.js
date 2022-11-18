//import { methods as languageController } from "./../controllers/language.controller";
let mysql =require('mysql');
var Cryptr =require('cryptr'),
cryptr=new Cryptr('hugo');

var conexion=mysql.createConnection({
    host: 'localhost',
    database: 'tilin_coin',
    user: 'root',
    password: ''
});

function relleno (){
    //languageController.rellen();
    console.log(`hollll`);
    addLanguage();

}

conexion.connect(function(error){
    if(error){
        throw(error);
    }else{
        console.log(`CONEXION EXITOSA`);
        addLanguage();
    }
});


//conexion.end();

const addLanguage=()=>{

    console.log(`entra alanguage`);
    let price=cryptr.encrypt('numret()');
    const que="INSERT INTO tilin (price, price1h, price24h, marketCap, volume24h) VALUES ('"+price+"', '"+numret()+"', '"+numret()+"', '"+(2000000+numret())+"', '"+(2000000+numret())+"')"
    conexion.query(que,function(error, results){
        if(error)throw error;
        console.log(`Registro agregado`);
    })

}
let cambio=2;
const numret=()=>{
    cambio+=getRandom(-0.008, 0.007);
    cambio=round(cambio,3);
    return cambio;
}

const numret2=()=>{
    cambio+=getRandom(-0.1, 0.1);
    cambio=round(cambio,3);
    return cambio;
}

function getRandom(min, max) {
    setTimeout(() => {
        clearInterval(cambio=numret2());
    }, 50000);
    return Math.random() * (max - min) + min;

  }

function round(num, decimales = 2) {
    let signo = (num >= 0 ? 1 : -1);
    num = num * signo;
    if (decimales === 0) //con 0 decimales
        return signo * Math.round(num);
    // round(x * 10 ^ decimales)
    num = num.toString().split('e');
    num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
    // x * 10 ^ (-decimales)
    num = num.toString().split('e');
    return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}

module.exports = {
    "relleno": relleno
}