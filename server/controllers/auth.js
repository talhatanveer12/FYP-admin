import User from "../models/User.js";
import bcrypt from "bcrypt";
import _ from "lodash";

export const register = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).json({ error: "Email already exits" });

  user = new User(
    _.pick(req.body, [
      "name",
      "email",
      "password",
      "occupation",
      "phoneNumber",
      "role",
    ])
  );
  user.password = await bcrypt.hash(user.password, 10);

  await user.save();

  const token = user.generateAuthToken();

  res.status(200).json("Successfully");
};

export const login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(422).json({ error: "Invalid Email and Password" });

  let checkPassword = await bcrypt.compare(req.body.password, user.password);
  if (!checkPassword)
    return res.status(422).json({ error: "Invalid Email and Password" });

  const token = user.generateAuthToken();
  user.password = null;
  //   const detail = {
  //     name: user.name,
  //     email: user.email,
  //     _id: user._id,
  //     bio: user.bio,
  //     profilePic: user.profilePic
  //   };

  res.json({ status: "Login", token: token, user: user });
};

export const update = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      email: req.body.email,
      occupation: req.body.occupation,
      phoneNumber: req.body.phoneNumber,
      role: req.body.role,
    });
    res.status(200).json("updating Successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("deleting Successfully");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const UserMe = async (req, res) => {
    const user = await User.findById(req.user._id).select("-password");
    res.send(user);
  };