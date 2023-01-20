import express from "express";
import bodyParser from "body-parser";

import cors from "cors";
import { fetchVideo } from "./controller/video.js";
import { getVideoByTitle, getVideos, getFreq } from "./db/query.js";
import cron from "node-cron";

// Cron Job to Schedule Fetching Videos every Minute
cron.schedule("* * * * *", () => {
  let title = "cricket";
  console.log("Fetching...");
  // Function to fetch Videos.
  fetchVideo(title);
});

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

app.listen(port, () => {
  console.log(`YT app listening at http://localhost:${port}`);
});

// app.get("/test", (req, res) => {
//   let title = "cricket";
//   console.log("Fetching...");
//   fetchVideo(title);
//   res.send("Hello, world!");
// });

// API end point to get All Videos.
app.get("/getVideos", getVideos);

// API end point to get Video by Title.
app.get("/videoByTitle", getVideoByTitle);

app.get("/getFreq", getFreq);
