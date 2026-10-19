import express from "express";
import cors from "cors"; // Cross-Origin Resource Sharing
import "dotenv/config";
//  جلب  محرك السيرفر 
// (Express).
//  بلا بيه ما كاين لا سيرفر ولا 
// API.

import healthRouter from "../routes/health.routes.js";
import chatRouter from "../routes/chat.routes.js";
import tasksRouter from "../routes/tasks.routes.js";
import authRouter from "../routes/auth.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;
//  (برمجيات وسيطة كدوز منها أي حاجة جاية للسيرفر):

app.use(cors());
app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/chat", chatRouter);
app.use("/api/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Tempo backend running on http://localhost:${PORT}`);
});