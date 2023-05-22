import Validate from "../../src/utils/Validate";

describe("Validate", () => {
  it("should validate old password input", () => {
    expect(Validate.oldPassword("")).toBe(
      "Type old password to make any changes"
    );
    expect(Validate.oldPassword("1234567")).toBe(
      "Password must be at least 8 characters"
    );
    expect(
      Validate.oldPassword(
        "12345678901234567890123456789012345678901234567890123456789012345678901234567890"
      )
    ).toBe("Password must be less than 65 characters");
  });
});
