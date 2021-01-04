const User = require("../model/User");

module.exports = {
  updateScore: async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(
        req.body.id,
        {
          score: req.body.score,
        },
        { new: true, runValidators: false }
      );

      return res.status(200).json({
        success: true,
        data: user,
      });
    } catch (err) {
      return res.status(200).json({
        success: false,
        data: err.message,
      });
    }
  },
};
