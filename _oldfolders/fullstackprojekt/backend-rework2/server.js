import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { errorHandling } from "./db/db.js";
import router from "./routes/routes.js";
import bodyParser from "body-parser";

const app = express();
const PORT = 8000;

app.use(errorHandling);

// CORS middleware használata
app.use(cors());

// JSON adatok kezelése (middleware)
app.use(express.json());

// Cookie parser middleware használata
app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running at ${PORT}`);
});

export default app;
