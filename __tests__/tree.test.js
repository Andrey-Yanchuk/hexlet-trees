// __tests__/tree.test.js
import { compressImages, mkdir, mkfile } from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the function compressImages", () => {
  test("with correctly values", () => {
    expect(
      compressImages(
        mkdir("my documents", [
          mkfile("avatar.jpg", { size: 100 }),
          mkfile("passport.jpg", { size: 200 }),
          mkfile("family.jpg", { size: 150 }),
          mkfile("addresses", { size: 125 }),
          mkdir("presentations"),
        ]),
      ),
    ).toEqual({
      name: "my documents",
      children: [
        { name: "avatar.jpg", meta: { size: 50 }, type: "file" },
        { name: "passport.jpg", meta: { size: 100 }, type: "file" },
        { name: "family.jpg", meta: { size: 75 }, type: "file" },
        { name: "addresses", meta: { size: 125 }, type: "file" },
        { name: "presentations", children: [], meta: {}, type: "directory" },
      ],
      meta: {},
      type: "directory",
    });
  });
  test("with empty values", () => {
    expect(() => compressImages()).toThrow("Tree must be an object!");
    expect(() => compressImages(123)).toThrow("Tree must be an object!");
  });
  test("with nested values", () => {
    expect(
      compressImages(
        mkdir("my documents", [
          mkfile("avatar.jpg", { size: 100 }),
          mkfile("passport.jpg", { size: 200 }),
          mkfile("family.jpg", { size: 150 }),
          mkfile("addresses", { size: 125 }),
          mkdir("presentations", [
            mkfile("friends.jpg", { size: 130 }),
            mkfile("pets.jpg", { size: 1000 }),
            mkdir("animation"),
          ]),
        ]),
      ),
    ).toEqual({
      name: "my documents",
      children: [
        { name: "avatar.jpg", meta: { size: 50 }, type: "file" },
        { name: "passport.jpg", meta: { size: 100 }, type: "file" },
        { name: "family.jpg", meta: { size: 75 }, type: "file" },
        { name: "addresses", meta: { size: 125 }, type: "file" },
        {
          name: "presentations",
          children: [
            { name: "friends.jpg", meta: { size: 65 }, type: "file" },
            { name: "pets.jpg", meta: { size: 500 }, type: "file" },
            { name: "animation", children: [], meta: {}, type: "directory" },
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
