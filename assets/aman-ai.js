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
