import timeToString from "../../src/utils/timeToString";

describe("timeToString", () => {
  it("should return a string with the start and end time", () => {
    const startTime = "10:00";
    const endTime = "11:00";
    const expected = "10:00 - 11:00";
    const actual = timeToString(startTime, endTime);
    expect(actual).toBe(expected);
  });
});
