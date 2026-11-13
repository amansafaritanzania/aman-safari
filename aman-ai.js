const responses = {
  price: "Kilimanjaro starts from $2,495 per person.",
  safari: "We run Serengeti, Ngorongoro, Tarangire and Ruaha safaris.",
  date: "Tell me your preferred month and group size.",
  hello: "Habari 👋 Welcome to Aman Safari."
};

function sendAI(){

const input =
document.getElementById(
"chatInput"
);

const text =
input.value.toLowerCase();

const chat =
document.getElementById(
"chatMessages"
);

chat.innerHTML +=
`<div>You: ${input.value}</div>`;

let reply =
"Tell me more about your trip.";

if(text.includes("price"))
reply = responses.price;

else if(text.includes("safari"))
reply = responses.safari;

else if(text.includes("date"))
reply = responses.date;

else if(
text.includes("hello")
||
text.includes("hi")
)
reply = responses.hello;

chat.innerHTML +=
`<div>Aman AI: ${reply}</div>`;

input.value="";

  }
import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: "PUT_YOUR_KEY_HERE"
});

app.post("/chat", async (req, res) => {

const message = req.body.message;

const response = await client.chat.completions.create({
model: "gpt-4o-mini",
messages: [
{
role: "system",
content: `
You are Aman Safari AI assistant.
You answer in English and Kiswahili.
You help users book safaris in Tanzania.
Be natural like ChatGPT.
`
},
{ role: "user", content: message }
]
});

res.json({
reply: response.choices[0].message.content
});

});

app.listen(3000, () => {
console.log("AI running...");
});
async function sendAI() {
  const input = document.getElementById("chatInput").value;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: input }]
    })
  });

  const data = await response.json();

  const reply = data.choices[0].message.content;

  document.getElementById("chatMessages").innerHTML += `
    <div>User: ${input}</div>
    <div>AI: ${reply}</div>
  `;
  }
