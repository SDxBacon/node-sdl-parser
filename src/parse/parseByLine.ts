import fs from "fs";
import readline from "readline";
import SDLData from "../types/SDLData";
import trim from "../utils/trim";
import { BEGIN_STR, STOP_STR } from "../constants";

/**
 * parse
 * @param filepath
 */
function parse(filepath: string): Promise<any> {
  return new Promise((resolve) => {
    /**
     * create read stream & readline interface
     */
    const sdlData = new SDLData();
    const readStream = fs.createReadStream(filepath);
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    /**
     * readline event: `line` handler
     */
    rl.on("line", (line: string) => {
      const trimLine = trim(line);
      if (trimLine.length > 0) {
        const [key, ...values] = trimLine.split("=");
        const value = values.join("=");

        sdlData.parseLine(key, value);
      }
    });

    /**
     * readline event: `close` handler
     */
    rl.on("close", () => {
      // closing readline and readStream
      rl.close();
      readStream.destroy();

      // sdlData will be resolved
      resolve(sdlData);
    });
  });
}

export default parse;
