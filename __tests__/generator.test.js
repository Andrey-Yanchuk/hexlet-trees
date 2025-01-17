// __tests__/generator.test.js
import {
  mkdir,
  mkfile,
  getChildren,
  getName,
  getMeta,
  isDirectory,
  isFile,
} from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the function mkdir", () => {
  test("with correct values", () => {
    expect(
      mkdir("root directory", [mkdir("empty directory")], { owner: "nobody" }),
    ).toEqual({
      name: "root directory",
      children: [
        { name: "empty directory", children: [], meta: {}, type: "directory" },
      ],
      meta: { owner: "nobody" },
      type: "directory",
    });
  });
  test("with empty values", () => {
    expect(() => mkdir()).toThrow(
      "Invalid directory name: it must be a non-empty string!",
    );
  });
  test("throws error for invalid name", () => {
    expect(() => mkdir("")).toThrow(
      "Invalid directory name: it must be a non-empty string!",
    );
    expect(() => mkdir(123)).toThrow(
      "Invalid directory name: it must be a non-empty string!",
    );
  });
  test("throws error for invalid children", () => {
    expect(() => mkdir("root directory", "I'm string")).toThrow(
      "Children must be an array!",
    );
  });
  test("throws error for invalid meta", () => {
    expect(() => mkdir("root directory", [], null)).toThrow(
      "Meta must be an object!",
    );
    expect(() => mkdir("root directory", [], "I'm string")).toThrow(
      "Meta must be an object!",
    );
  });
});
describe("Testing the function mkfile", () => {
  test("with correctly values", () => {
    expect(mkfile("README.md", { type: "text" })).toEqual({
      name: "README.md",
      meta: { type: "text" },
      type: "file",
    });
  });
  test("with empty values", () => {
    expect(() => mkfile()).toThrow(
      "Invalid file name: it must be a non-empty string!",
    );
  });
  test("correctly embeds a file inside a directory", () => {
    expect(
      mkdir("root directory", [mkfile("README.md", { type: "text" })], {
        owner: "nobody",
      }),
    ).toEqual({
      name: "root directory",
      children: [{ name: "README.md", meta: { type: "text" }, type: "file" }],
      meta: { owner: "nobody" },
      type: "directory",
    });
  });
  test("throws error for invalid name", () => {
    expect(() => mkfile("")).toThrow(
      "Invalid file name: it must be a non-empty string!",
    );
    expect(() => mkfile(123)).toThrow(
      "Invalid file name: it must be a non-empty string!",
    );
  });
  test("throws error for invalid meta", () => {
    expect(() => mkfile("file", null)).toThrow("Meta must be an object!");
    expect(() => mkfile("file", "I'm string")).toThrow(
      "Meta must be an object!",
    );
  });
});
describe("Testing the function getChildren", () => {
  test("with correctly values", () => {
    expect(
      getChildren(
        mkdir("root directory", [mkfile("README.md", { type: "text" })], {
          owner: "nobody",
        }),
      ),
    ).toEqual([{ name: "README.md", meta: { type: "text" }, type: "file" }]);
  });
  test("with empty values", () => {
    expect(() => getChildren(mkdir())).toThrow(
      "Invalid directory name: it must be a non-empty string!",
    );
  });
  test("with nested values", () => {
    expect(
      getChildren(
        mkdir(
          "root directory",
          [
            mkfile("README.md", { type: "text" }),
            mkdir("root directory", [mkdir("empty directory")], {
              owner: "nobody",
            }),
          ],
          { owner: "nobody" },
        ),
      ),
    ).toEqual([
      { name: "README.md", meta: { type: "text" }, type: "file" },
      {
        name: "root directory",
        children: [
          {
            name: "empty directory",
            children: [],
            meta: {},
            type: "directory",
          },
        ],
        meta: { owner: "nobody" },
        type: "directory",
      },
    ]);
  });
});
describe("Testing the function getName", () => {
  test("with correctly values dir", () => {
    expect(
      getName(
        mkdir("root directory", [mkfile("README.md", { type: "text" })], {
          owner: "nobody",
        }),
      ),
    ).toBe("root directory");
  });
  test("with empty values dir", () => {
    expect(() => getName(mkdir())).toThrow(
      "Invalid directory name: it must be a non-empty string!",
    );
  });
  test("with nested values", () => {
    expect(
      getName(
        mkdir(
          "root directory",
          [
            mkfile("README.md", { type: "text" }),
            mkdir("root directory", [mkdir("empty directory")], {
              owner: "nobody",
            }),
          ],
          { owner: "nobody" },
        ),
      ),
    ).toBe("root directory");
  });
  test("with correctly values file", () => {
    expect(getName(mkfile("README.md", { type: "text" }))).toBe("README.md");
  });
  test("with empty values file", () => {
    expect(() => getName(mkdir())).toThrow(
      "Invalid directory name: it must be a non-empty string!",
    );
  });
});
describe("Testing the function getMeta", () => {
  test("with correctly values dir", () => {
    expect(
      getMeta(
        mkdir("root directory", [mkfile("README.md", { type: "text" })], {
          owner: "nobody",
        }),
      ),
    ).toEqual({ owner: "nobody" });
  });
  test("with empty values dir", () => {
    expect(() => getMeta(mkdir())).toThrow(
      "Invalid directory name: it must be a non-empty string!",
    );
  });
  test("with nested values dir", () => {
    expect(
      getMeta(
        mkdir(
          "root directory",
          [
            mkfile("README.md", { type: "text" }),
            mkdir("root directory", [mkdir("empty directory")], {
              owner: "nobody",
            }),
          ],
          { owner: "nobody" },
        ),
      ),
    ).toEqual({ owner: "nobody" });
  });
  test("with correctly values file", () => {
    expect(getMeta(mkfile("README.md", { type: "text" }))).toEqual({
      type: "text",
    });
  });
  test("with empty values file", () => {
    expect(() => getMeta(mkfile())).toThrow(
      "Invalid file name: it must be a non-empty string!",
    );
  });
});
describe("Testing the function isDirectory", () => {
  test("with correctly values", () => {
    expect(
      isDirectory(
        mkdir("root directory", [mkfile("README.md", { type: "text" })], {
          owner: "nobody",
        }),
      ),
    ).toBeTruthy();
  });
  test("with ivalid values", () => {
    expect(
      isDirectory(mkfile("README.md", { type: "text" }, { owner: "nobody" })),
    ).toBeFalsy();
  });
  test("with empty values dir", () => {
    expect(() => isDirectory(mkdir())).toThrow(
      "Invalid directory name: it must be a non-empty string!",
    );
  });
});
describe("Testing the function isFile", () => {
  test("with  correctly values", () => {
    expect(
      isFile(mkfile("README.md", { type: "text" }, { owner: "nobody" })),
    ).toBeTruthy();
  });
  test("with invalid values", () => {
    expect(
      isFile(
        mkdir("root directory", [mkfile("README.md", { type: "text" })], {
          owner: "nobody",
        }),
      ),
    ).toBeFalsy();
  });
  test("with empty values file", () => {
    expect(() => isFile(mkfile())).toThrow(
      "Invalid file name: it must be a non-empty string!",
    );
  });
});
