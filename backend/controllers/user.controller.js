import User from "../models/user.model.js";

export const getUsersBySearch = async (req, res) => {
  try {
    const searchQuery = req.params.searchQuery;
    const users = await User.find({
      $or: [
        { username: { $regex: searchQuery, $options: "i" } },
        { fullName: { $regex: searchQuery, $options: "i" } }
      ]
    })
    .select('-password -__v')
    .sort({ username: 1 });

    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error: "Something went wrong." });
  }
}