import { getConnection } from "./../database/database";
import {rellenar} from "./../rellenar";

const getLanguages = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT `price`, `price1h`, `price24h`, `marketCap`, `volume24h` FROM tilin ORDER by id DESC LIMIT 1");        
        const operacion = require("./../rellenar")
        operacion.relleno()
        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,**Authorization**');
        
        res.json(modify(result));

    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
//INSERT INTO `tilin` (`price`, `price1h`, `price24h`, `marketCap`, `volume24h`) VALUES ('2.345', '2.3555', '2.33', '200000.35', '200000000.35');

function modify(pric){
    let modify=numret(parseInt(pric[0].price1h));
    let pety={price:modify, price1h:pric[0].price1h, price24h:pric[0].price24h, marketCap:pric[0].marketCap, volume24h:pric[0].volume24h};

    return pety
}
const numret=(cambio)=>{
    cambio+=getRandom(-0.009, 0.008);
    cambio=round(cambio,3);
    return cambio.toString();
}
function getRandom(min, max) {
    return Math.random() * (max - min) + min;

  }

const addLanguage = async (req, res) => {
    try {
        const { price=2.9, price1h=2.9,price24h=2.9,marketCap=20000.9,volume24h=20000000.9 } = req.body;

        if (price === undefined || price1h === undefined|| price24h === undefined|| marketCap === undefined|| volume24h === undefined) {
            res.status(400).json({ message: "Bad Request. Please fill all field." });
        }

        const language = { price, price1h,price24h,marketCap,volume24h };
        const connection = await getConnection();
        await connection.query("INSERT INTO tilin SET ?", language);
        res.json({ message: "precio added" });
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};


const deleteLanguage = async (req, res) => {
    try {
        const { id } = req.params;
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM language WHERE id = ?", id);
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};

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

export const methods = {
    getLanguages,
    addLanguage,
    deleteLanguage,
};
