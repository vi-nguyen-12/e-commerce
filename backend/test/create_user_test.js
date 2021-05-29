import { assert } from "chai";
import User from "../models/userModel.js";

describe("Creating user", () => {
  it("creates a user", (done) => {
    const user = new User({
      name: "test_name",
      email: "test@test.com",
      password: "123456",
    });
    user
      .save()
      .then(() => {
        assert(!poke.isNew);
        done();
      })
      .catch((err) => done(err));
  });
});
