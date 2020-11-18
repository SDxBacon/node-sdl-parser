import { EOL } from "os";
import trim from "./utils/trim";

/**
 *
 * @param line
 */
function parseLine(line: string) {
  // TODO:
}

/**
 *
 * @param section
 */
function parseSection(section: string[]) {
  // TODO:
}

/**
 * 將data內的TOKEN和End中間所描述的內容，轉換Section
 * @param data
 */
function toSections(data: string): any {
  const trimData = trim(data);

  /** split data into sections*/
  const sections = trimData
    // split data into sections
    .split(/^TOKEN(?:\r\n|[\r\n])([\s\S]*?)End$/gm);

  return sections;
}

/**
 * parse
 * @param {string} data
 */
function parse(data: string) {
  /** parse data into sections */
  const sections = toSections(data);

  /** handle section */
  // const temp = sections.map(parseSection);

  console.log(sections);
}

export default parse;
