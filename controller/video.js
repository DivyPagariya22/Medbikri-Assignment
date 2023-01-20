import axios from "axios";
import { createVideoItem } from "../db/query.js";
import dotenv from "dotenv";
dotenv.config();

let i = 0;
// URL for getting Data from YouTube
const URL = process.env.URL;

const keys = [
  process.env.API_KEY_1,
  process.env.API_KEY_2,
  process.env.API_KEY_3,
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
  //console.log(data);
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

export const sortThemByFrequency = (data) => {
  let map = {};
  data.map((item) => {
    let str = item.title.split(" ");
    str.forEach((word) => (map[word] ? map[word]++ : (map[word] = 1)));
  });

  let keyVals = Object.entries(map);
  let sortedNestedArray = keyVals.sort((a, b) => a[1] - b[1]);
  let resultArray = sortedNestedArray.reverse();
  resultArray = resultArray.slice(0, 10);
  return resultArray;
};
