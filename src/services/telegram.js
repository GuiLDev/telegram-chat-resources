import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

//função pode exportar futuramente com export para outros metodos também
//o async é uma forma de identificar que a função pode demorar responder
//ele espera a resposta da API e então ativa o metodo POST para enviar uma mensagem
export async function sendMessage(chatId, text,  options = {}) {
  const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // aqui ele vai avisar a API que vamos enviar em formato JSON o nosso metodo
    },
    
    //Essa parte é responsavel por enviar a mensagem diretamente para um chat_id que será identificado em um retorno da API
    body: JSON.stringify({
      chat_id: chatId,
      text,
      ...options
    }),
  });

  const data = await response.json();

  return data;
}

//Essa função são os comandos dos / no chat quando enviados pelo chat_id
export async function setBotCommands() {
  const response = await fetch(`${TELEGRAM_API_URL}/setMyCommands`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      commands: [
        {
          command: "start",
          description: "Iniciar o bot",
        },
        {
          command: "help",
          description: "Ver comandos disponíveis",
        },
        {
          command: "menu",
          description: "Abrir menu principal",
        },
        {
          command: "cancel",
          description: "Cancelar operação"
        }
      ],
    }),
  });

  const data = await response.json();

  return data;
}