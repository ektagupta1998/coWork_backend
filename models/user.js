import mongoose from "mongoose";
import CryptoJS from "crypto-js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    type: { type: String, required: true },
    location: { type: String },
    profile_file: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  const secretKey = process.env.PASSWORD_SECRET || "mySecretKey";
  this.password = CryptoJS.AES.encrypt(this.password, secretKey).toString();
  next();
});

userSchema.methods.getDecryptedPassword = function () {
  const secretKey = process.env.PASSWORD_SECRET || "mySecretKey";
  const bytes = CryptoJS.AES.decrypt(this.password, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};

const User = mongoose.model("User", userSchema);

export default User;
