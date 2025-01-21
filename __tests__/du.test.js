import { du, mkdir, mkfile } from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the function du", () => {
  test("with correctly values", () => {
    expect(
      du(
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
    ).toEqual([
      ["etc", 10280],
      ["hosts", 3500],
      ["resolve", 1000],
    ]);
  });
  test("with invalid value", () => {
    expect(() =>
      du(
        mkdir("/", [
          mkdir("etc", [
            mkdir("apache"),
            mkdir("nginx", [mkfile(123, { size: 800 })]),
            mkdir("consul", [
              mkfile("config.json", { "max-width": 1200 }),
              mkfile("data", { size: 8200 }),
              mkfile("raft", { size: 80 }),
            ]),
          ]),
          mkfile("hosts", { size: null }),
          mkfile("resolve"),
        ]),
      ),
    ).toThrow("Invalid file name: it must be a non-empty string!");
  });
  test("with only directory", () => {
    expect(
      du(
        mkdir("/", [
          mkdir("etc", [
            mkdir("apache"),
            mkdir("nginx"),
            mkdir("consul", [mkdir("src", [mkdir("__tests__")])]),
          ]),
        ]),
      ),
    ).toEqual([["etc", 0]]);
  });
  test("with only files", () => {
    expect(
      du(
        mkdir("/", [
          mkfile("hosts", { size: 3500 }),
          mkfile("resolve", { size: 1000 }),
        ]),
      ),
    ).toEqual([
      ["hosts", 3500],
      ["resolve", 1000],
    ]);
  });
});
