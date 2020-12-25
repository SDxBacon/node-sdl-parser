import parseByLine from "./src/parse/parseByLine";

export { parseByLine as parse };

const nodeSDLParser = { parse: parseByLine };
export default nodeSDLParser;
