import path from "path";
import readFile from "./src/readFile";
import parse from "./src/parse";

/**
 * locate sdl file path
 */
const fp = path.join(__dirname, "./test/data/Oem.sdl");

async function run() {
  /** read file */
  const data = await readFile(fp);

  /** parse data */
  parse(data);
}

run();
