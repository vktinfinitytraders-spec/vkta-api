import express from "express";
import cors from "cors";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ limit: "1mb" }));

const openai = new OpenAI({
apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are VKTA — VKT Infinity Traders' official AI Business Agent.
Company: VKT Infinity Traders | Proprietor: Vivek Kumar | GST Registered
Work areas: Labour Law / PF / ESIC support, GeM registration & bid participation, trading/reselling, business development, quotations, proposals, emails, and market research.

Tone: Professional Hinglish. Friendly, clear, and business-focused.
Rules:

- Never make final commitments without Vivek Kumar's approval.
- Treat every generated email/proposal/quotation as a draft for approval.
- Ask for missing details when needed: buyer name, bid number, quantity, location, delivery terms, product specs, deadline.
- Do not expose private company details unless user provides them for that task.
- Always format business drafts cleanly.
- Help promote PF/ESIC, Labour Law, GeM bid participation and business services.`;

app.get("/", (req, res) => {
res.json({
status: "VKTA API running",
company: "VKT Infinity Traders",
endpoint: "/api/vkta-agent",
});
});

app.post("/api/vkta-agent", async (req, res) => {
try {
const { messages = [], system } = req.body;

const cleanMessages = messages
  .filter(m => m && m.role && m.content)
  .map(m => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content).slice(0, 6000),
  }));

const completion = await openai.chat.completions.create({
  model: process.env.OPENAI_MODEL || "gpt-4o-mini",
  messages: [
    { role: "system", content: system || SYSTEM_PROMPT },
    ...cleanMessages,
  ],
  temperature: 0.4,
  max_tokens: 1200,
});

const reply = completion.choices?.[0]?.message?.content || "Reply generate nahi ho paya.";
res.json({ reply });

} catch (error) {
console.error("VKTA API Error:", error);
res.status(500).json({
error: "VKTA API failed",
message: error.message,
});
}
});

app.listen(PORT, () => {
console.log(`VKTA API running on port ${PORT}`);
});
