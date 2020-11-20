import path from "path";
import parseByLine from "./src/parse/parseByLine";

const fp = path.join(__dirname, "./test/data/Oem.sdl");

/**
 * execute parseSDL
 */
parseByLine(fp).then((sdlData) => {
  const phaseCode = sdlData.get("PHASE_CODE");
  const majorVersion = sdlData.get("PROJECT_MAJOR_VERSION");
  const minorVersion = sdlData.get("PROJECT_MINOR_VERSION");

  console.log(`PHASE_CODE: ${phaseCode}`);
  console.log(`Major version: ${majorVersion}`);
  console.log(`Minor version: ${minorVersion}`);
});
