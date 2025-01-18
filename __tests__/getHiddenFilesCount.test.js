// __tests__/getHiddenFilesCount.test.js
import { getHiddenFilesCount, mkdir, mkfile } from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the function getHiddenFilesCount", () => {
  test("with correctly values", () => {
    expect(
      getHiddenFilesCount(
        mkdir("/", [
          mkdir("etc", [
            mkdir("apache"),
            mkdir("nginx", [mkfile(".nginx.conf", { size: 800 })]),
            mkdir(".consul", [
              mkfile(".config.json", { size: 1200 }),
              mkfile("data", { size: 8200 }),
              mkfile("raft", { size: 80 }),
            ]),
          ]),
          mkfile(".hosts", { size: 3500 }),
          mkfile("resolve", { size: 1000 }),
        ]),
      ),
    ).toBe(3);
  });
  test("with invalid values", () => {
    expect(() =>
      getHiddenFilesCount(
        mkdir("/", [
          mkdir(null, [
            mkdir(1337),
            mkdir("nginx", [mkfile(".nginx.conf", { size: 800 })]),
            mkdir(".consul", [
              mkfile(".config.json", { size: 1200 }),
              mkfile("data", { size: 8200 }),
              mkfile([], { size: 80 }),
            ]),
          ]),
          mkfile(".hosts", { size: 3500 }),
          mkfile("resolve", { size: 1000 }),
        ]),
      ),
    ).toThrow("Invalid directory name: it must be a non-empty string!");
  });
  test("with only visible files", () => {
    expect(
      getHiddenFilesCount(
        mkdir("/", [
          mkdir("etc", [
            mkdir("apache"),
            mkdir("nginx", [mkfile("nginx.conf", { size: 800 })]),
            mkdir("consul", [
              mkfile("config.json", { size: 1200 }),
              mkfile("data", { size: 8200 }),
              mkfile("raft", { size: 80 }),
            ]),
          ]),
          mkfile("hosts", { size: 3500 }),
          mkfile("resolve", { size: 1000 }),
        ]),
      ),
    ).toBe(0);
  });
  test("with only directory", () => {
    expect(
      getHiddenFilesCount(
        mkdir("/", [
          mkdir(".etc", [mkdir(".apache"), mkdir("nginx"), mkdir(".consul")]),
        ]),
      ),
    ).toBe(0);
  });
});
