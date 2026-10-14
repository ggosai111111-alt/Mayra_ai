const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

if (!userMessage) {
      return res.status(400).json({
        error: "Message is required"
      });
    }

const response = await fetch("YOUR_AI_PROVIDER_ENDPOINT", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.AI_API_KEY}`
      },
      body: JSON.stringify({
        message: userMessage,
        system: "आप Mayra नाम की helpful Hindi AI assistant हैं।"
      })
    });

const data = await response.json();

res.json({
      reply: data.reply || data.output || "मुझे जवाब नहीं मिला।"
    });
  } catch (error) {
    res.status(500).json({
      error: "AI server error"
    });
  }
});

app.listen(3000, () => {
  console.log("Mayra backend running on port 3000");
});
