# Objective
To make an API to fetch latest videos sorted in reverse chronological order of their
publishing date-time from YouTube for a given tag/search query in a paginated response.
# Basic Requirements:
● Server should call the YouTube API continuously in background (async) with some interval (say 10 seconds) for fetching the latest videos for a predefined search query and should store the data of videos (specifically these fields - Video title, description, publishing datetime, thumbnails URLs and any other fields you require) in a database with proper indexes.
● An API which returns the stored video data in a paginated response sorted in descending order of published datetime.
● A basic search API to search the stored videos using their title and description.
# Bonus Points:
● Add support for supplying multiple API keys so that if quota is exhausted on one, it automatically uses the next available key.
● Make a dashboard to view the stored videos with filters and sorting options (optional)

# Nodejs

# Environment vars
This project uses the following environment variables:

# Pre-requisites
- Install [Node.js]
- Install nodemon too
- Install Postgresql

# Getting started
- Clone the repository
```
git clone  <git lab template url> <project_name>
```
- Install dependencies
```
cd <project_name>
npm install
```
- Build and run the project
```
npm start
```
  Navigate to `http://localhost:5000`

- API Document endpoints

  Fetching All Videos Endpoint : http://localhost:5000/getVideos

  Fetching Videos by Title  Endpoint : http://localhost:5000/videoByTitle?title=<Your_Title>
