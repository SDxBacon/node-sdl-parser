# node-sdl-parser [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

This is an utility to parse the text file that written in system description lanuage, which is also known as SDL, that American Megatrends, Inc. published.

這是個用來解析 AMI(美商安邁 American Megatrends, Inc.)所使用的 SDL(System Description Language)的一個 utility 程式

# Installation

The library will be published as an npm package, once it is ready. To install the package run:

```bash
# use npm
npm install node-sdl-parser --save

# or with yarn
yarn add node-sdl-parser
```

# How to use

Thats assume we have a SDL file and it contains following contents:

```
 TOKEN
  Name  = "PHASE_CODE"
  Value = "A"
 End

 TOKEN
  Name  = "PROJECT_MAJOR_VERSION"  # comments will be ignored :D
  Value = "1"
 End

 TOKEN
  Name  = "PROJECT_MINOR_VERSION"
  Value = "01"
 End
```

Then, here is a example:

```js
/* import the module */
import sdlParser from "node-sdl-parser";
import { parse } from "node-sdl-parser"; // this also works

/** The file path to the sdl text file. */
const fp = `path/to/file/you/want/to/parse`;

/** parse and see what we got */
const sdlData = sdlParser.parse(fp);
sdlData.get("PHASE_CODE"); // output: A, type: string
sdlData.get("PROJECT_MAJOR_VERSION"); // output: 1, type: string
sdlData.get("PROJECT_MINOR_VERSION"); // output: 01, type: string
```

# License
