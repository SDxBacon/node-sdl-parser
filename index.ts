import path from "path";
import parseSDL from "./src/parseSDL";

/**
 * allocate sdl file path
 */
const splitDirname: string[] = __dirname.split('node-sdl-parser');
const isBuilt = splitDirname[1] === '/build'
const fp = path.join(__dirname, `${isBuilt ? '../': ''}`, "./data/Oem.sdl");

/**
 * execute parseSDL
 */
parseSDL(fp);
