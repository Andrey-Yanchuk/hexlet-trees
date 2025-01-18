// __tests__/downcaseFileNames.test.js
import { downcaseFileNames, mkdir, mkfile } from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the function downcaseFileNames", () => {
  test("with correctly values", () => {
    expect(
      downcaseFileNames(
        mkdir("/", [
          mkdir("eTc", [
            mkdir("NgiNx"),
            mkdir("CONSUL", [mkfile("config.json")]),
          ]),
          mkfile("hOsts"),
        ]),
      ),
    ).toEqual({
      name: "/",
      children: [
        {
          name: "eTc",
          children: [
            { name: "NgiNx", children: [], meta: {}, type: "directory" },
            {
              name: "CONSUL",
              children: [{ name: "config.json", meta: {}, type: "file" }],
              meta: {},
              type: "directory",
            },
          ],
          meta: {},
          type: "directory",
        },
        { name: "hosts", meta: {}, type: "file" },
      ],
      meta: {},
      type: "directory",
    });
  });
  test("with invalid values", () => {
    expect(() =>
      downcaseFileNames(
        mkdir("/", [
          mkdir("eTc", [mkdir(null), mkdir("CONSUL", [mkfile(52)])]),
          mkfile(["hOsts"]),
        ]),
      ),
    ).toThrow("Invalid directory name: it must be a non-empty string!");
  });
  test("with directories only", () => {
    const tree = mkdir("/", [
      mkdir("ETC", []),
      mkdir("VAR", [mkdir("LIB", [])]),
    ]);
    expect(downcaseFileNames(tree)).toEqual({
      name: "/",
      children: [
        { name: "ETC", children: [], meta: {}, type: "directory" },
        {
          name: "VAR",
          children: [
            { name: "LIB", children: [], meta: {}, type: "directory" },
          ],
          meta: {},
          type: "directory",
        },
      ],
      meta: {},
      type: "directory",
    });
  });
});
