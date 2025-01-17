// src/index.js
/*-----------------------------------------------------*/
export const removeFirstLevel = (tree) => {
  if (!Array.isArray(tree))
    throw new Error("The passed tree argument must be an array");
  return tree.filter((el) => Array.isArray(el)).flat(1);
};
/*-----------------------------------------------------*/
export const mkdir = (name, children = [], meta = {}) => {
  if (typeof name !== "string" || name.trim() === "")
    throw new Error("Invalid directory name: it must be a non-empty string!");
  if (!Array.isArray(children)) throw new Error("Children must be an array!");
  if (typeof meta !== "object" || meta === null)
    throw new Error("Meta must be an object!");
  return { name, children, meta, type: "directory" };
};
export const mkfile = (name, meta = {}) => {
  if (typeof name !== "string" || name.trim() === "")
    throw new Error("Invalid file name: it must be a non-empty string!");
  if (typeof meta !== "object" || meta === null)
    throw new Error("Meta must be an object!");
  return { name, meta, type: "file" };
};
export const getName = (node) => node.name;
export const getChildren = (node) => node.children;
export const getMeta = (node) => node.meta;
export const isDirectory = (node) => node.type === "directory";
export const isFile = (node) => node.type === "file";
const tree = mkdir(
  "nodejs-package",
  [
    mkfile("Makefile"),
    mkfile("README.md"),
    mkdir("dist"),
    mkdir("__tests__", [mkfile("half.test.js", { type: "text/javascript" })]),
    mkfile("babel.config.js", { type: "text/javascript" }),
    mkdir(
      "node_modules",
      [mkdir("@babel", [mkdir("cli", [mkfile("LICENSE")])])],
      { owner: "root", hidden: false },
    ),
  ],
  { hidden: true },
);
console.log(tree);
