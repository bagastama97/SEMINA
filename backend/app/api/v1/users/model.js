const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require("bcryptjs");
let userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Nama harus di isi"],
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email harus di isi"],
    },
    password: {
      type: String,
      required: [true, "Password harus di isi"],
      minLength: 6,
    },
    role: {
      type: String,
      enum: ["admin", "organizer", "owner"],
      default: "admin",
    },
    organizer: {
      type: mongoose.Types.ObjectId,
      ref: "Organizer",
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const User = this;
  if (User.isModified("password"))
    User.password = await bcrypt.hash(User.password, 12);
  next();
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = model("User", userSchema);
