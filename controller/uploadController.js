const fs = require("fs");

const upload = require("../upload");
const User = require("../model/User");

module.exports.getUpload = (req, res) => {
  res.render("index");
};

module.exports.postUpload = (req, res) => {
  if (!fs.existsSync("public/uploads")) {
    fs.mkdirSync("public/uploads");
  }

  upload(req, res, async (error) => {
    if (error) {
      return res.render("upload", {
        isSuccess: false,
        message: "Upload failed!",
      });
    }
    console.log(req.fileName);
    await User.findByIdAndUpdate(
      req.user._id,
      { link: `/uploads/${req.user.username}` },
      { new: true, runValidators: true }
    );
    res.render("upload", {
      isSuccess: true,
      message: "Tải lên thành công!",
      link: `/uploads/${req.user.username}`,
    });
  });
};
