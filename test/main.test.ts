/**
 * locate sdl file path
 */
import fs from "fs";
import path from "path";
import appendDummy from "./utils/appendDummy";

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
  test("Put your test case here", async function () {
    // Put your test case here
  });
}

start_test();
