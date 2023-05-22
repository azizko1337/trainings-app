import removeDuplicates from "../../src/utils/removeDuplicates";

describe("removeDuplicates", () => {
  it("should remove duplicates from an array", () => {
    const arr = ["a", "b", "c", "a", "b", "c"];
    const expected = ["a", "b", "c"];
    const actual = removeDuplicates(arr);
    expect(actual).toEqual(expected);
  });
});
