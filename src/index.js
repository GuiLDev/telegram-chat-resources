import express from "express";
import dotenv from "dotenv";

//Essa parte le o .env e configura ele no resto do código
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const BOT_TOKEN = process.env.BOT_TOKEN;

if (!BOT_TOKEN){
  console.log('BOT_TOKEN não encontrado no .env');
}else{
  console.log('BOT_TOKEN carregado com sucesso')
}

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Servidor do bot Telegram rodando!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});