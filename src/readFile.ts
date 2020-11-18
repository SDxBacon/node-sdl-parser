import fs from "fs";

function readSDLFile(filepath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(filepath, "utf8", (error, data) => {
      /** error occur while reading file*/
      if (error) reject(error);

      resolve(data);
    });
  });
}

export default readSDLFile;
