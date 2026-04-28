import express from "express";
import puppeteer from "puppeteer";

const app = express();

const EMBED_URL = "https://streamfree.app/embed/basketball/detroit-pistons-vs-orlando-magic";

async function getM3U8() {
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });

  const page = await browser.newPage();

  let m3u8 = null;

  // 🔥 FIXED (response instead of request)
  page.on("response", async (res) => {
    const url = res.url();

    if (url.includes("index.m3u8") && !url.includes("session-ping")) {
      m3u8 = url;
    }
  });

  await page.goto(EMBED_URL, { waitUntil: "networkidle2" });

  // hintayin mag-load stream
  await new Promise(r => setTimeout(r, 6000));

  await browser.close();

  if (!m3u8) throw new Error("No m3u8 found");

  return m3u8;
}

// homepage
app.get("/", (req, res) => {
  res.send("AUTO SYSTEM RUNNING");
});

// stream endpoint
app.get("/stream", async (req, res) => {
  try {
    const link = await getM3U8();
    res.send(link);
  } catch (err) {
    res.send("FAILED TO GET STREAM");
  }
});

app.listen(3000, () => console.log("Server running"));
