const mongoose = require("mongoose");
const { model, Schema } = mongoose;

let organizerSchema = Schema(
  {
    organizer: {
      type: String,
      required: [true, "Penyelenggara harus di isi"],
    },
  },
  { timestamps: true }
);

module.exports = model("Organizer", organizerSchema);
