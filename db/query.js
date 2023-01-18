import pg from "pg";
const { Pool } = pg;

// Details to connect with PostgreSQL Database.
const pool = new Pool({
  user: "me",
  host: "localhost",
  database: "api",
  password: "divy",
  port: 5432,
});

// Fetch All Video data from Database in Descending order of Uploading time with Limit (20 here).
export const getVideos = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 20;
  // Query for Fetching all Videos
  pool.query(
    `SELECT * FROM ytvideo ORDER BY date DESC LIMIT ${limit}`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

//  Fetch Videos by title from Database in Descending order of Uploading time.
// (Here videos are matched with title whose starting is same as query requested by user)
export const getVideoByTitle = (req, res) => {
  let title = req.query.title;
  // Query for Fetching Video By Title
  pool.query(
    `SELECT * FROM ytvideo WHERE title LIKE '${title}%' ORDER BY date DESC`,
    (error, results) => {
      if (error) {
        throw error;
      }
      res.status(200).json(results.rows);
    }
  );
};

// Creating new Entries in Table from fetched YT api data.
// I have done Upsert operation here Insert if not present in table and update if present in table.
export const createVideoItem = async (
  id,
  title,
  description,
  date,
  thumbnail
) => {
  // Query for upsert
  pool.query(
    "INSERT INTO ytvideo (id, title, description, date, thumbnail) VALUES ($1, $2, $3, $4, $5) ON CONFLICT(id) DO NOTHING RETURNING *",
    [id, title, description, date, thumbnail],
    (error, results) => {
      if (error) {
        throw error;
      }
    }
  );
};
