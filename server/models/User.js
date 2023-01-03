import mongoose from "mongoose";
import jwt from "jsonwebtoken";


const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    transactions: Array,
    role: {
      type: String,
      enum: ["sale_manager", "admin", "accountant","user"],
      default: "admin",
    },
  },
  { timestamps: true }
);
UserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, role: this.role },
    process.env.PRIVATEKEY
  );
  return token;
};

const User = mongoose.model("User", UserSchema);
export default User;
