import mongoose from "mongoose";
import CryptoJS from "crypto-js";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    type: { type: String, required: true },
    location: { type: String },
    profile_photo: { type: String },
    company_name: { type: String, required: false },
    contact_number: { type: Number, required: true },
    inventory: { type: String, required: false },
    sd_amount: { type: Number, required: false },
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

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
