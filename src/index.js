import express from "express";
import dotenv from "dotenv";

//Essa parte le o .env e configura ele no resto do código
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor do bot Telegram rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});