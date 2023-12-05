import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from "./middlewares/middleware.mjs";
import { getDishes } from "./controllers/dish-controller.mjs";
import { dishRouter } from "./routes/dish-router.mjs";
import cors from "cors";

const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", express.static(path.join(__dirname, "../docs")));
// serve uploaded mediafiles url: /media/{file}
app.use("/media", express.static(path.join(__dirname, "../uploads")));

// simple custom middleware for logging/debugging all requests
// if (!process.env.NODE_ENV === 'development') {
//   app.use(logger);
// }

app.use(logger);

app.get("/", (req, res) => {
  const values = {
    title: "Dummy REST API for dessert",
    message: "",
  };
  res.render("home", values);
});

// endpoints
app.use("/api/dish", dishRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
