import path from "path";
import parseSDL from "./src/parseSDL";

/**
 * allocate sdl file path
 */
const fp = path.join(__dirname, "./data/Oem.sdl");

/**
 * execute parseSDL
 */
parseSDL(fp);
