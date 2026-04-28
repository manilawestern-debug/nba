app.get("/stream", async (req, res) => {
  try {
    const url = "https://streamfree.app/live/detroit-pistons-vs-orlando-magic1080p/index.m3u8?_t=HiOZiFb6COU2a4gX26pTjQ&_e=1777371201&_n=70c1b0084c0f6b02"; // ← yung kinopy mo

    const response = await fetch(url, {
      headers: {
        "Referer": "https://streamfree.app/embed/basketball/",
        "Origin": "https://streamfree.app",
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    });

    const data = await response.text();

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(data);

  } catch (err) {
    res.status(500).send("Error loading stream");
  }
});
