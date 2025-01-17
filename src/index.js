// src/index.js
// import _ from "lodash";
import util from "util"; // Для отображения уровня вложенности
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
// console.log(tree);
/*-----------------------------------------------------*/
const treeTwo = mkdir("my documents", [
  mkfile("avatar.jpg", { size: 100 }),
  mkfile("passport.jpg", { size: 200 }),
  mkfile("family.jpg", { size: 150 }),
  mkfile("addresses", { size: 125 }),
  mkdir("presentations"),
]);
export const compressImages = (tree) => {
  if (typeof tree !== "object" || tree === null)
    throw new Error("Tree must be an object!");
  const children = getChildren(tree);
  const newChildren = children.map((child) => {
    if (isFile(child) && child.name.endsWith(".jpg")) {
      const newMeta = { ...getMeta(child), size: getMeta(child).size / 2 };
      return mkfile(child.name, newMeta);
    }
    // Рекурсивно обрабатываем директории
    if (isDirectory(child)) return compressImages(child);
    return child;
  });
  return mkdir(getName(tree), newChildren, getMeta(tree));
};
// console.log(util.inspect(compressImages(treeTwo), { depth: 5, colors: true }));
/*-----------------------------------------------------*/
