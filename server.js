app.post("/download", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.json({ error: "No URL provided" });
  }

  exec(`yt-dlp -f best -g "${url}"`, (err, stdout, stderr) => {
    if (err) {
      console.log(stderr);
      return res.json({ error: "download failed" });
    }

    res.json({ link: stdout.trim() });
  });
});
