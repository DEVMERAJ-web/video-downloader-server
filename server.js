const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

// Health check route (important for Railway)
app.get("/", (req, res) => {
  res.status(200).send("Server is running");
});

// Test route
app.get("/ping", (req, res) => {
  res.json({ status: "ok" });
});

// Download route
app.post("/download", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({ error: "No URL provided" });
  }

  exec(`yt-dlp -f best -g "${url}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(stderr);
      return res.status(500).json({ error: "Download failed" });
    }

    res.json({ link: stdout.trim() });
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
