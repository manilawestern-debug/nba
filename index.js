app.get("/stream", async (req, res) => {
  try {
    const url = "https://streamfree.app/live/detroit-pistons-vs-orlando-magic1080p/index.m3u8?_t=HiOZiFb6COU2a4gX26pTjQ&_e=1777371201&_n=70c1b0084c0f6b02";

    const response = await fetch(url, {
      headers: {
        "Referer": "https://streamfree.app/embed/basketball/detroit-pistons-vs-orlando-magic"
        "Origin": "https://streamfree.app",
        "User-Agent": "Mozilla/5.0",
        "Accept": "*/*"
      }
    });

    // 🔥 IMPORTANT CHECK
    if (!response.ok) {
      return res.status(500).send("Bad response from source");
    }

    const text = await response.text();

    // 🔥 CHECK kung valid m3u8
    if (!text.includes("#EXTM3U")) {
      return res.send("INVALID STREAM (expired or blocked)");
    }

    res.setHeader("Content-Type", "application/vnd.apple.mpegurl");
    res.send(text);

  } catch (err) {
    res.status(500).send("ERROR FETCHING STREAM");
  }
});
