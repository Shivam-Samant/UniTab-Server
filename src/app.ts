import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import cors from "cors";
import { Server } from "socket.io";
import { setupSocket } from "./utils/socket.util"
import { connectDB } from "./configs/db.config";
import APP_ROUTES from "./routes";
import "./utils/googleAuth.util"

const app = express();
const PORT = process.env.PORT || 8000;

// DB Connection
connectDB()

// Middlewares
app.use(express.json());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
}))

// Routes
for (let routeConfig of APP_ROUTES) {
    app.use(routeConfig.prefix, routeConfig.route)
}

app.get("/", (req: any, res: any) => res.send("Express on Vercel"));

app.get("/api/", (req: Request, res: Response) => {
  res.send("UniTab Application");
});

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const io = new Server(server, {
  cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
    },
});
setupSocket(io);

export default app
