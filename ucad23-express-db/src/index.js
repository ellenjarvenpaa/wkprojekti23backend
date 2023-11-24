import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { logger } from './middlewares/middleware.mjs';
import { getDishes } from "./controllers/dish-controller.mjs";


const hostname = "127.0.0.1";
const app = express();
const port = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "pug");
app.set("views", "src/views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/docs", express.static(path.join(__dirname, "../docs")));
// serve uploaded mediafiles url: /media/{file}
app.use("/media", express.static(path.join(__dirname, "../uploads")));

// simple custom middleware for logging/debugging all requests
if (!process.env.NODE_ENV === 'development') {
  app.use(logger);
}

app.get("/", getDishes);

app.get("/document", (req, res) => {
  const values = {
    title: "Dummy REST API for media",
    message: "Media will be displayed here",
  };
  res.render("home", values);
});

// endpoints

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
