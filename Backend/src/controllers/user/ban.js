const { User } = require("../../db");

const ban = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({
      where: { id },
    });
    if (!user) throw new Error("couldn't find user with id: " + id);
    user.isBanned = true;
    await user.save();
    res.json("Success");
  } catch (err) {
    res.status(400).json(err.message);
  }
};
module.exports = ban;
