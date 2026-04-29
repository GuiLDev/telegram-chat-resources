import express from "express";
import dotenv from "dotenv";
import { sendMessage, setBotCommands } from "./services/telegram.js";

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

//Essa parte é onde recebe a requisição do POST e mostra no terminal
app.post("/webhook", async (req, res) => {
  const update = req.body;

  //apenas para ver se está chegando a rota
  console.log("UPDATE COMPLETO:");
  console.log(JSON.stringify(update, null, 2));

  if (update.callback_query) {
  const callbackQuery = update.callback_query;
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  console.log("Callback recebido:");
  console.log(data);

  if (data === "create_item") {
    await sendMessage(chatId, "Você clicou em: Criar item");
  }

  if (data === "list_items") {
    await sendMessage(chatId, "Você clicou em: Listar itens");
  }

  if (data === "update_item") {
    await sendMessage(chatId, "Você clicou em: Atualizar item");
  }

  if (data === "delete_item") {
    await sendMessage(chatId, "Você clicou em: Deletar item");
  }
  return res.sendStatus(200);
}


  console.log("Update recebido:");
  console.log(update);

  const message = update.message;
  const text = message?.text;
  const chatId = message?.chat?.id;

  if (text === "/start") {
    await sendMessage(chatId, "Olá! Bot iniciado com sucesso.");
  }

  if (text === "/help") {
    await sendMessage(chatId, "Comandos disponíveis:\n\n/start - Iniciar o bot\n/help - Ver ajuda\n/menu - Abrir menu principal");
  }

  if (text === "/menu") {
  await sendMessage(chatId, "Menu principal:", {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Criar item", callback_data: "create_item" }],
        [{ text: "Listar itens", callback_data: "list_items" }],
        [{ text: "Atualizar item", callback_data: "update_item" }],
        [{ text: "Deletar item", callback_data: "delete_item" }],
      ],
    },
  });
}

  res.sendStatus(200);
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

app.get("/set-commands", async (req, res) => {
  const result = await setBotCommands();

  console.log(result);

  res.send(result);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});