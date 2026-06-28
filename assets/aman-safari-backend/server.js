import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});


// --------------------
// 🧠 AI CHAT ROUTE
// --------------------
app.post("/chat", async (req, res) => {

  const message = req.body.message;

  try {

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are Aman Safari AI Assistant.

You help with:
- safari bookings in Tanzania
- travel advice
- general questions (any topic)
- school & learning help

Be friendly, short, and helpful.
`
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    res.json({
      reply: "Server error. Try again later."
    });
  }

});


// --------------------
// 📩 BOOKING ROUTE
// --------------------
app.post("/book", (req, res) => {

  const { name, email, park, people, date } = req.body;

  console.log("NEW BOOKING:");
  console.log(req.body);

  res.json({
    success: true,
    message: "Booking received successfully"
  });

});


// --------------------
// START SERVER
// --------------------
app.listen(process.env.PORT, () => {
  console.log("Aman Safari backend running on port " + process.env.PORT);
});
