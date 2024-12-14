import puppeteer from "puppeteer";
import fs from "fs/promises";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const user = {
  email: "smartpostai1", // Replace with your username/email
  password: "watashiwastar", // Replace with your password
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  let cookies = [];
  try {
    const cookieData = await fs.readFile("cookies.json", "utf-8");
    cookies = JSON.parse(cookieData);
    console.log("Loaded session cookies.");
  } catch (error) {
    console.log("No saved cookies found. Proceeding with login...");
  }

  const browser = await puppeteer.launch({
    headless: false, // Set to false to see browser actions
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();

  if (cookies.length) {
    await page.setCookie(...cookies);
    await page.reload({ waitUntil: "networkidle2" });
  }

  await goToProfiles(page);

  // await browser.close();
})();

const profileIds = ["nike"];
const posts = [];

const goToProfiles = async (page) => {
  for (const profile of profileIds) {
    console.log(`Visiting profile: ${profile}`);
    await page.goto(`https://www.instagram.com/${profile}/`, {
      waitUntil: "networkidle2",
    });

    await delay(3000);
    console.log("finding a post");
    const element = await page.waitForSelector(
      "xpath/" +
        "/html/body/div[2]/div/div/div/div[2]/div/div/div[1]/div[2]/div/div[1]/section/main/div/div[2]/div/div[1]/div[1]/a"
    );
    console.log("found post");

    await element.click();
    const data = {};
    console.log("opening the post");
    const url = page.url();
    if (url[url.length - 2] === "=") {
      console.log("post has multiple images");

      for (let i = 0; i < 10; i++) {
        try {
          const nextImgArrow = await page.waitForSelector(
            'button[aria-label="Next"]._afxw._al46._al47 > div._9zm2',
            { timeout: 1000 }
          );
          nextImgArrow.click();
          await delay(500);
          console.log(page.url());
        } catch (error) {
          const lastUrl = page.url();

          data["postUrl"] = lastUrl;
          break;
        }
      }
    } else {
      data["postUrl"] = page.url();
    }

    data["postedBy"] = profile;

    const text = await page.evaluate(() => {
      const element = document.querySelector(
        'div[class*="x1qjc9v5"][class*="x972fbf"] div[class*="x78zum5"][class*="xdt5ytf"] section[class*="x12nagc"][class*="x182iqb8"] span a span'
      );
      return element.textContent.trim();
    });
    data["likes"] = Number(text.split(" ")[0].replace(/,/g, ""));

    await page.waitForSelector("time.x1p4m5qa");

    const dateTime = await page.evaluate(() => {
      const timeElement = document.querySelector("time.x1p4m5qa");
      return timeElement ? timeElement.getAttribute("datetime") : null;
    });

    data["postedAt"] = dateTime;

    await page.waitForSelector("h1._ap3a._aaco._aacu._aacx._aad7._aade");

    const headingText = await page.evaluate(() => {
      const h1Element = document.querySelector(
        "h1._ap3a._aaco._aacu._aacx._aad7._aade"
      );
      return h1Element ? h1Element.textContent : null;
    });
    data["caption"] = headingText;

    const videoClass = "x1lliihq.x5yr21d.xh8yej3"; // Class for video
    const imageClass = "x5yr21d.xu96u03.x10l6tqk.x13vifvy.x87ps6o.xh8yej3"; // Class for image

    const videoElement = await page.$(`.${videoClass}`); // Check for video element
    const imageElement = await page.$(`.${imageClass}`); // Check for image element

    if (videoElement) {
      data["type"] = "video";
    } else if (imageElement) {
      data["type"] = "image";
    }

    //gets comments
    await delay(3000);
    await page.waitForSelector("div._a9zs");

    const moreCommentsButton = await page.waitForSelector(
      'button._abl- div._abm0 > svg[aria-label="Load more comments"]'
    );
    await moreCommentsButton.click();
    console.log("clicked more comments");

    await delay(5000);

    const comments = await page.$$(
      "div._a9zs > span._ap3a._aaco._aacu._aacx._aad7._aade"
    );

    const commentTexts = await Promise.all(
      comments.map(async (comment) => {
        return await comment.evaluate((el) => el.innerText);
      })
    );
    data["comments"] = commentTexts;
    console.log(data);

    delay(100000);
  }
};
