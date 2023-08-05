const Categories = require("../../api/v1/categories/model");
const { BadRequest, NotFound } = require("../../errors");

const getAllCategories = async (req) => {
  const result = await Categories.find({ organizer: req.user.organizer });
  return result;
};
const getOneCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findOne({
    _id: id,
    organizer: req.user.organizer,
  }).select("_id name");
  if (!result) throw new NotFound(`Tidak ada kategori dengan id: ${id}`);
  return result;
};
const createCategories = async (req) => {
  const { name } = req.body;
  const check = await Categories.findOne({
    name,
    organizer: req.user.organizer,
  });
  if (check) throw new BadRequest("kategori nama duplikat");
  const result = await Categories.create({
    name,
    organizer: req.user.organizer,
  });
  return result;
};
const updateCategories = async (req) => {
  const { id } = req.params;
  const { name } = req.body;
  // $ne berarti dia akan cari semua data kecuali yang id itu
  const check = await Categories.findOne({
    name,
    _id: { $ne: id },
    organizer: req.user.organizer,
  });
  if (check) throw new BadRequest("kategori nama duplikat");
  const result = await Categories.findByIdAndUpdate(
    { _id: id },
    { name },
    { new: true, runValidators: true }
  );
  if (!result) throw new NotFound(`Tidak ada kategori dengan id: ${id}`);
  return result;
};
const destroyCategories = async (req) => {
  const { id } = req.params;
  const result = await Categories.findByIdAndRemove({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!result) throw new NotFound(`Tidak ada kategori dengan id: ${id}`);
  return result;
};
const checkingCategories = async (id) => {
  const result = await Categories.findOne({ _id: id });
  if (!result) throw new NotFound(`Tidak ada kategori dengan id: ${id}`);
  return result;
};
module.exports = {
  getAllCategories,
  getOneCategories,
  createCategories,
  updateCategories,
  destroyCategories,
  checkingCategories,
};
