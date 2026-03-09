const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

// Root route so Railway health check sees the server running
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Download route
app.post("/download", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  exec(`yt-dlp -f "bestvideo+bestaudio/best" -g "${url}"`, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
      return res.json({ error: "Download failed" });
    }

    res.json({ link: stdout.trim() });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
