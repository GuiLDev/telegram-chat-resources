import dotenv from "dotenv";

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

//função pode exportar futuramente com export para outros metodos também
//o async é uma forma de identificar que a função pode demorar responder
//ele espera a resposta da API e então ativa o metodo POST para enviar uma mensagem
export async function sendMessage(chatId, text) {
  const response = await fetch(`${TELEGRAM_API_URL}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // aqui ele vai avisar a API que vamos enviar em formato JSON o nosso metodo
    },
    
    //Essa parte é responsavel por enviar a mensagem diretamente para um chat_id que será identificado em um retorno da API
    body: JSON.stringify({
      chat_id: chatId,
      text,
    }),
  });

  const data = await response.json();

  return data;
}