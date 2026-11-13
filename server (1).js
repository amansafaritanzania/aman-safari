import express from "express";
import cors from "cors";
import db from "./database.js";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const ai = new OpenAI({
apiKey: "YOUR_OPENAI_API_KEY"
});


// 📦 SAVE BOOKING
app.post("/book", (req,res)=>{

const {name,email,phone,park,date,people,message} = req.body;

db.run(`
INSERT INTO bookings
(name,email,phone,park,date,people,message)
VALUES (?,?,?,?,?,?,?)
`,
[name,email,phone,park,date,people,message]
);

res.json({status:"success",message:"Booking saved"});
});


// 🧠 AI ASSISTANT
app.post("/ai", async (req,res)=>{

const userMessage = req.body.message;

const response = await ai.chat.completions.create({
model:"gpt-4o-mini",
messages:[
{
role:"system",
content:`
You are a luxury Tanzania safari booking assistant.

Your job:
- Help users choose parks
- Collect booking details
- Be polite and premium
- Keep replies short

When user gives full info, tell them booking is ready.
`
},
{role:"user",content:userMessage}
]
});

res.json({
reply: response.choices[0].message.content
});

});

app.listen(3000, ()=>{
console.log("Safari booking system running on port 3000");
});
