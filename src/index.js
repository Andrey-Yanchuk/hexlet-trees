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
const changeOwner = (tree, owner = "root") => {
  const name = getName(tree);
  const newMeta = JSON.parse(JSON.stringify(getMeta(tree))); // Глубокое копирование объектов при помощи JSON объекта, сначала превращаем код в строку, а потом эту строку обратно превращаем в JS(не поддерживает копирование: функций, undefined, symbol и объекты с циклическими ссылками, Не работает с объектами(Map, Set, Date, RegExp), в таком случае лучше использовать _.cloneDepp или аналоги)
  newMeta.owner = owner;
  if (isFile(tree)) {
    return mkfile(name, newMeta);
  }
  const children = getChildren(tree);
  const newChildren = children.map((child) => changeOwner(child, owner));
  return mkdir(name, newChildren, newMeta);
};
const treeOwner = mkdir("/", [
  mkdir(
    "etc",
    [
      mkfile("bashrc", { owner: "Oleg" }),
      mkfile("consul.cfg", { owner: "Oleg" }),
    ],
    { owner: "Oleg" },
  ),
  mkfile("hexletrc", { owner: "Dmitriy" }),
  mkdir(
    "bin",
    [
      mkfile("ls", { owner: "Alexey" }),
      mkfile("cat", { owner: "Alexey" }),
      mkdir(
        "users",
        [
          mkdir(
            "Anton-user",
            [
              mkfile("Anton-file--1", { owner: "Anton" }),
              mkfile("Anton-file--2", { owner: "Anton" }),
            ],
            { owner: "Anton" },
          ),
          mkdir(
            "Olesya-user",
            [
              mkfile("Olesya-file--1", { owner: "Olesya" }),
              mkfile("Olesya-file--2", { owner: "Olesya" }),
            ],
            { owner: "Olesya" },
          ),
        ],
        { owner: "Oleg" },
      ),
    ],
    { owner: "Alexey" },
  ),
]);
// console.log(util.inspect(changeOwner(treeOwner, "Andrey"), { depth: 5, colors: true }));
/*-----------------------------------------------------*/
export const downcaseFileNames = (tree) => {
  const newName = isFile(tree) ? getName(tree).toLowerCase() : getName(tree);
  const newMeta = JSON.parse(JSON.stringify(getMeta(tree)));
  if (isFile(tree)) {
    return mkfile(newName, newMeta);
  }
  const children = getChildren(tree);
  const newChildren = children.map((child) => downcaseFileNames(child));
  return mkdir(newName, newChildren, newMeta);
};
const treeDownCase = mkdir("/", [
  mkdir("eTc", [mkdir("NgiNx"), mkdir("CONSUL", [mkfile("config.json")])]),
  mkfile("hOsts"),
]);
// console.log(util.inspect(downcaseFileNames(treeDownCase), { depth: 7, colors: true }));
/*-----------------------------------------------------*/
