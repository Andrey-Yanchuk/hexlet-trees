// src/index.js
/*-----------------------------------------------------*/
export const removeFirstLevel = (tree) => {
  if (!Array.isArray(tree))
    throw new Error("The passed tree argument must be an array");
  return tree.filter((el) => Array.isArray(el)).flat(1);
};
/*-----------------------------------------------------*/
