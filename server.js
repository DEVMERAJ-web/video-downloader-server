const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.send("Backend running");
});

// download route
app.post("/download", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  exec(`yt-dlp -f best -g "${url}"`, (error, stdout, stderr) => {
    if (error) {
      console.log(stderr);
      return res.json({ error: "Download failed" });
    }

    res.json({ link: stdout.trim() });
  });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Server running on port " + PORT);
});
