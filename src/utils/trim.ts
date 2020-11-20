const REGEXP_BLANK_LINE = "^s*(?:\r\n?|\n)";
const REGEXP_COMMENTS = "#.*$";
const REGEXP_WHITESPACE_CHARACTERS = "\\s";
const REGEXP_QUOTES = '"';

const regexp = new RegExp(
  `${REGEXP_QUOTES}|${REGEXP_WHITESPACE_CHARACTERS}|${REGEXP_BLANK_LINE}|${REGEXP_COMMENTS}`,
  "gm"
);

const trim = (str: string): string => {
  return str.replace(regexp, "");
};

export default trim;
