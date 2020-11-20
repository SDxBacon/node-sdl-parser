/**
 * locate sdl file path
 */
import fs from "fs";
import path from "path";
import appendDummy from "./utils/appendDummy";
import parseByLine from "../src/parse/parseByLine";

const fpTestData = path.join(__dirname, "./data/Oem.sdl");
const fpTestDataJumbo = path.join(__dirname, "./data/Oem.Jumbo.sdl");

/**
 * 初始化函式，製作Oem.Jumbo.sdl
 */
function init() {
  return new Promise((resolve, reject) => {
    fs.copyFile(fpTestData, fpTestDataJumbo, function (err) {
      if (err) reject(err);
      appendDummy(fpTestDataJumbo);
      resolve();
    });
  });
}
beforeAll(init);

/**
 * 完成所有test case後，刪除Jumbo
 */
function clean() {
  return new Promise((resolve, reject) => {
    fs.unlink(fpTestDataJumbo, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
}
afterAll((done) => {
  clean().then(() => {
    done();
  });
});

/**
 * start_test
 */
function start_test() {
  const parseByLineCallback = function (sdlData) {
    const phaseCode = sdlData.get("PHASE_CODE");
    const majorVersion = sdlData.get("PROJECT_MAJOR_VERSION");
    const minorVersion = sdlData.get("PROJECT_MINOR_VERSION");
    expect(phaseCode).toEqual("A");
    expect(majorVersion).toEqual("0");
    expect(minorVersion).toEqual("01");
  };

  test("testing with normal size", function () {
    return parseByLine(fpTestData).then(parseByLineCallback);
  });

  test("testing with jumbo size", function () {
    return parseByLine(fpTestDataJumbo).then(parseByLineCallback);
  });
}

start_test();
