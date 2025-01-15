// __tests__/remove-first-level.test.js
import { removeFirstLevel } from "../src/index.js";
/*-----------------------------------------------------*/
describe("Testing the function removeFirstLevel", () => {
  test("correct values with the first level of nesting ", () => {
    expect(removeFirstLevel([[5], 1, [3, 4]])).toEqual([5, 3, 4]);
  });
  test("correct values with the second level of nesting ", () => {
    expect(removeFirstLevel([1, 2, [3, 5], [[4, 3], 2]])).toEqual([
      3,
      5,
      [4, 3],
      2,
    ]);
  });
  test("with negative values", () => {
    expect(removeFirstLevel([-1, -2, [-3, -5], [[-4, -3], -2]])).toEqual([
      -3,
      -5,
      [-4, -3],
      -2,
    ]);
  });
  test("with 0 values", () => {
    expect(removeFirstLevel([0, 0, [0, 0], [[0, 0], 0]])).toEqual([
      0,
      0,
      [0, 0],
      0,
    ]);
  });
  test("with invalid arguments", () => {
    expect(() => removeFirstLevel(`I'm string`)).toThrow(
      "The passed tree argument must be an array",
    );
  });
});
