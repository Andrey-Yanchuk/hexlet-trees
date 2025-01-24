// __tests__/findFilesByName.test.js
import { findFilesByName, mkdir, mkfile } from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the function findFilesByName", () => {
  test("with correctly values", () => {
    const trees = mkdir("/", [
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
    ]);
    expect(findFilesByName(trees, "co")).toEqual([
      "/etc/nginx/nginx.conf",
      "/etc/consul/config.json",
    ]);
  });
  test("with invalid values", () => {
    const invalidTreeCheckDir = () =>
      mkdir(null, [
        // Оборачиваем создание дерева в функцию, чтобы ошибка возникла только при её вызове, а не при определении.
        mkdir(52, [
          mkdir("apache"),
          mkfile("nginx.conf", { "max-width": 800 }),
        ]),
        mkfile("resolve", { size: 1000 }),
      ]);
    const invalidTreeCheckFile = () =>
      mkdir("/", [
        // Оборачиваем создание дерева в функцию, чтобы ошибка возникла только при её вызове, а не при определении.
        mkdir("etc", [mkdir("apache"), mkfile(null, { "max-width": 800 })]),
        mkfile(1337, { size: 1000 }),
      ]);
    expect(() => findFilesByName(invalidTreeCheckDir(), "res")).toThrow(
      "Invalid directory name: it must be a non-empty string!",
    );
    expect(() => findFilesByName(invalidTreeCheckFile(), "res")).toThrow(
      "Invalid file name: it must be a non-empty string!",
    );
  });
  test("with an empty string or no argument", () => {
    const trees = mkdir("/", [
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
    ]);
    expect(findFilesByName(trees, "")).toEqual([
      "/etc/nginx/nginx.conf",
      "/etc/consul/config.json",
      "/etc/consul/data",
      "/etc/consul/raft",
      "/hosts",
      "/resolve",
    ]);
  });
  test("with only directory", () => {
    const trees = mkdir("/", [
      mkdir("etc", [mkdir("apache"), mkdir("nginx", []), mkdir("consul", [])]),
    ]);
    expect(findFilesByName(trees, "co")).toEqual([]);
  });
  test("with only files", () => {
    const trees = mkfile("config.json", { size: 1200 });
    expect(findFilesByName(trees, "co")).toEqual(["config.json"]);
  });
});
