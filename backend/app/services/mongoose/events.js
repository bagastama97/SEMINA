const Events = require("../../api/v1/events/model");
const { checkingImage } = require("./images");
const { checkingCategories } = require("./categories");
const { checkingTalents } = require("./talents");

const { BadRequest, NotFound } = require("../../errors");

const getAllEvents = async (req) => {
  const { keyword, category, talent } = req.query;
  let condition = { organizer: req.user.organizer };
  if (keyword)
    condition = { ...condition, title: { $regex: keyword, $options: "i" } };
  if (category) condition = { ...condition, category: category };
  if (talent) condition = { ...condition, talent: talent };

  const result = await Events.find(condition)
    .populate({ path: "image", select: "_id name" })
    .populate({ path: "category", select: "_id name" })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });
  return result;
};

const getOneEvent = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({
    _id: id,
    organizer: req.user.organizer,
  })
    .populate({ path: "image", select: "_id name" })
    .populate({ path: "category", select: "_id name" })
    .populate({
      path: "talent",
      select: "_id name role image",
      populate: { path: "image", select: "_id name" },
    });
  if (!result) throw new NotFound(`Tidak ada pembicara dengan id: ${id}`);
  return result;
};

const updateEvents = async (req) => {
  const { id } = req.params;
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  const check = await Events.findOne({
    title,
    organizer: req.user.organizer,
    _id: { $ne: id },
  });
  if (check) throw new BadRequest("judul event duplikat");
  const result = await Events.findOneAndUpdate(
    { _id: id },
    {
      title,
      date,
      about,
      tagline,
      venueName,
      keyPoint,
      statusEvent,
      tickets,
      image,
      category,
      talent,
      organizer: req.user.organizer,
    },
    { new: true, runValidators: true }
  );
  if (!result) throw new NotFound(`Tidak ada acara dengan id: ${id}`);
  return result;
};

const createEvents = async (req) => {
  const {
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
  } = req.body;

  await checkingImage(image);
  await checkingCategories(category);
  await checkingTalents(talent);

  const check = await Events.findOne({ title });
  if (check) throw new BadRequest("judul event duplikat");
  const result = await Events.create({
    title,
    date,
    about,
    tagline,
    venueName,
    keyPoint,
    statusEvent,
    tickets,
    image,
    category,
    talent,
    organizer: req.user.organizer,
  });
  return result;
};
const deleteEvents = async (req) => {
  const { id } = req.params;
  const result = await Events.findOne({
    _id: id,
    organizer: req.user.organizer,
  });
  if (!result) throw new NotFound(`Tidak ada pembicara dengan id: ${id}`);
  await Events.deleteOne({ _id: id });

  return result;
};

module.exports = {
  getAllEvents,
  getOneEvent,
  updateEvents,
  createEvents,
  deleteEvents,
};
