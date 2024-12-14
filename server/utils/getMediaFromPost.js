import { igdl } from "btch-downloader";
const url = "https://www.instagram.com/p/DDfBMYyvpgJ/";

export const downloadMedia = async (url) => {
  const data = await igdl(url);
  console.log(data);
};

downloadMedia(url);
