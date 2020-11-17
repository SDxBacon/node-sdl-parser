import fs from "fs";
import readline from "readline";
import { Block, BLOCK_START, BLOCK_END, Targets } from "./types/Block";

function parseSDL(filepath: string) {
  /**
   * local variables
   */
  let isBlockStart = false;
  let cache: Block;
  let output;

  /**
   * create read stream & readline interface
   */
  const readSteam = fs.createReadStream(filepath);
  const rl = readline.createInterface({
    input: readSteam,
    crlfDelay: Infinity,
  });

  /**
   * readline event: `line` handler
   */
  rl.on("line", (line: string) => {
    /**
     * TODO: NOT READY YET
     */
    if (line === BLOCK_START) {
      // on block start
      isBlockStart = true;
      cache = {};
    } else if (line === BLOCK_END) {
      isBlockStart = false;
      console.log("cache:", cache);
    } else {
      const index = line.indexOf("=");
      if (index > -1) {
        const key = line.substring(0, index).trim();
        const value = line.substring(index + 1)?.trim();
        /**
         * TODO: just a quick workaround
         */
        if (key === Targets[0]) {
          cache.Name = value;
        } else if (key === Targets[1]) {
          cache.Value = value;
        } else if (key === Targets[2]) {
          cache.Token = value;
        } else {
          cache.props = cache.props ?? [];
          cache.props.push(line.trim());
        }
      }
    }
  });

  /**
   * readline event: `close` handler
   */
  rl.on("close", () => {
    rl.close();
    readSteam.destroy();
  });
}

export default parseSDL;
