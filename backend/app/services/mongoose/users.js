const Users = require("../../api/v1/users/model");
const Organizers = require("../../api/v1/organizer/model");
const { BadRequest } = require("../../errors");
const { StatusCodes } = require("http-status-codes");

const createOrganizer = async (req) => {
  const { organizer, email, role, password, confirmPassword, name } = req.body;
  if (password !== confirmPassword)
    throw new BadRequest("Password dan confirmation password tidak cocok");

  const result = await Organizers.create({ organizer });
  const users = await Users.create({
    email,
    name,
    password,
    role,
    organizer: result._id,
  });

  delete users._doc.password;

  return users;
};
const createUsers = async (req, res) => {
  const { email, role, password, confirmPassword, name } = req.body;
  if (password !== confirmPassword)
    throw new BadRequest("Password dan confirmation password tidak cocok");

  const result = await Users.create({
    email,
    name,
    password,
    role,
    organizer: req.user.organizer,
  });

  return result;
};
const getAllUsers = async (req) => {
  const result = await Users.find();
  return result;
};
module.exports = { createOrganizer, createUsers, getAllUsers };
