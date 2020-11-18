const REGEXP_BLANK_LINE = "^s*(?:\r\n?|\n)";
const REGEXP_COMMENTS = "#.*$";

const regexpBlankLine = new RegExp(`${REGEXP_BLANK_LINE}`, "gm");
const regexpComments = new RegExp(`${REGEXP_COMMENTS}`, "gm");

const trim = (str: string): string => {
  return str.replace(regexpComments, "").replace(regexpBlankLine, "");
};

export default trim;
