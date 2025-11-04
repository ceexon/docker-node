import express from "express";
import mongoose from "mongoose";
import { RedisStore } from "connect-redis";
import session from "express-session";
import { createClient } from "redis";
import cors from "cors";

import { mongo, session as sessionENV } from "./config/environment.js";
import PostRouter from "./routes/post.js";
import AuthRouter from "./routes/auth.js";

const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB } = mongo;
const { REDIS_HOST, REDIS_PORT, SESSION_SECRET } = sessionENV;

const redisClient = createClient({
  url: `redis://${REDIS_HOST}:${REDIS_PORT}`,
});
redisClient
  .connect()
  .then(() => console.log("Redis Connected"))
  .catch(console.error);

mongoose
  .connect(
    `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`
  )
  .then(() => console.log("Mongo Connected"))
  .catch((e) => console.log(e));

const redisStore = new RedisStore({ client: redisClient });

const app = express();
app.enable("trust proxy");
app.use(cors({}))

app.use(
  session({
    store: redisStore,
    resave: false,
    saveUninitialized: false,
    secret: SESSION_SECRET,
    cookie: {
      secure: false,
      httpOnly: true,
      maxAge: 30000000,
    },
  })
);

app.get("/api", (req, res) => {
  res.send(`<h2>Hi There Trevor!</h2>`);
});

app.use(express.json());

app.use("/api/posts", PostRouter);
app.use("/api/auth", AuthRouter);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => console.log(`Listening to PORT: ${PORT}`));
