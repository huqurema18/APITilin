import { getConnection } from "./../database/database";

const getLanguages = async (req, res) => {
    try {
        const connection = await getConnection();
        const result = await connection.query("SELECT `price`, `price1h`, `price24h`, `marketCap`, `volume24h` FROM tilin ORDER by id DESC LIMIT 1");
        res.json(result);
    } catch (error) {
        res.status(500);
        res.send(error.message);
    }
};
//INSERT INTO `tilin` (`price`, `price1h`, `price24h`, `marketCap`, `volume24h`) VALUES ('2.345', '2.3555', '2.33', '200000.35', '200000000.35');

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

export const methods = {
    getLanguages,
    addLanguage,
    deleteLanguage
};