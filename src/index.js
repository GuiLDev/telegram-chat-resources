import express from "express";
import dotenv from "dotenv";
import { sendMessage } from "./services/telegram.js";

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

//Essa parte do código é responsavel por enviar a mensagem para o chat_id pelo BOT
app.get("/test-message", async (req, res) => {
  const chatId = process.env.TEST_CHAT_ID;

  if (!chatId) {
    return res.status(400).send("TEST_CHAT_ID não encontrado no .env");
  }

  const result = await sendMessage(chatId, "Mensagem de teste enviada pelo bot!");

  console.log(result);

  res.send("Mensagem enviada!");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});