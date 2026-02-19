import express from "express"
import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import adminRoutes from "./routes/Admin.routes.js"
import memberRoutes from "./routes/member.routes.js"
import eventRoutes from "./routes/Event.routes.js"
import impactRoutes from "./routes/ImpactStory.routes.js"
import storyRoutes from "./routes/story.routes.js";
const app = express();

const allowedOrigins = [
  process.env.ADMIN_ORIGIN,
  process.env.CLIENT_ORIGIN,
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/admin", adminRoutes);
app.use("/api/member",memberRoutes);
app.use("/api/event", eventRoutes);
app.use("/api/impact", impactRoutes);
app.use("/api/stories", storyRoutes);


export default app;