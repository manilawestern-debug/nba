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

  page.on("request", req => {
    const url = req.url();
    if (url.includes(".m3u8")) {
      m3u8 = url;
    }
  });

  await page.goto(EMBED_URL, { waitUntil: "networkidle2" });

  await new Promise(r => setTimeout(r, 5000));

  await browser.close();

  if (!m3u8) throw new Error("No m3u8 found");

  return m3u8;
}

app.get("/", (req, res) => {
  res.send("AUTO SYSTEM RUNNING");
});

app.get("/stream", async (req, res) => {
  try {
    const link = await getM3U8();
    res.send(link);
  } catch (err) {
    res.send("FAILED TO GET STREAM");
  }
});

app.listen(3000, () => console.log("Server running"));
