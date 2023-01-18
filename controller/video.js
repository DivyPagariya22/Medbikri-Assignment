import axios from "axios";
import { createVideoItem } from "../db/query.js";

// I am not storing Variables in env as it can create problem when someone will pull this project in their local Machine

// Variables which should be put in env files
/*
URL of YT search
YT API Keys
*/

let i = 0;
// URL for getting Data from YouTube
const URL =
  "https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=date&";

const keys = [
  "AIzaSyCDEn9N-y-1qhnCfcSLWTpqzGv6pSa8iYg",
  "AIzaSyCf6LlHIqoXohfTSTS4FW8PhJx0EyQex9w",
  "AIzaSyAl7UY70_el3QIz3dioCyuIrasW6hcLMdc",
];

// Just for Testing
export const test = (req, res) => {
  res.send("Hello There!");
};

// API call to get data from YT API
export const fetchVideo = async (title) => {
  const url = URL + "key=" + keys[i] + "&" + title;
  // Axios API call
  const response = await axios(url);
  const data = response.data.items;
  // console.log(data);
  // If data i snot fetched due to request limit then try another API Keys.
  if (!data) {
    if (i < keys.length) {
      i++;
      fetchVideo(title);
    } else {
      console.log("All Keys Quota Exhausted");
    }
  }
  // Saving Data in Database
  readInDatabase(data);
};

// Function which saves data in Database.
const readInDatabase = async (data) => {
  // Data => video data
  data.map((item) => {
    const snippet = item.snippet;
    const id = item.id.videoId;

    // To avoid error in Database. (id = videoId)
    if (id !== undefined) {
      const { title, description, publishTime } = snippet;
      const thumbnail = snippet.thumbnails.default.url;

      // This Function do Database calls to save video.
      createVideoItem(id, title, description, publishTime, thumbnail);
    }
  });
};
