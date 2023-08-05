const Users = require("../../api/v1/users/model");
const { BadRequest, Unautorized } = require("../../errors");
const { createJWT, createTokenUser } = require("../../utils");

const signin = async (req) => {
  const { email, password } = req.body;
  if (!email || !password)
    throw new BadRequest("Please provide email and password");
  const result = await Users.findOne({ email: email });
  if (!result) throw new Unautorized("Invalid credentials");

  const isPasswordCorrect = await result.comparePassword(password);
  if (!isPasswordCorrect) throw new Unautorized("Invalid credentials");
  const token = createJWT({ payload: createTokenUser(result) });
  return token;
};

module.exports = { signin };
