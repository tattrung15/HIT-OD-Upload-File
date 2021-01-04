const User = require("../model/User");

module.exports.auth = async (req, res, next) => {
  try {
    let { userId } = req.signedCookies;

    if (!userId) {
      return res.redirect("/auth/login");
    }

    let user = await User.findOne({ username: userId });

    if (!user) {
      return res.redirect("/auth/login");
    }

    req.user = user;
    next();
  } catch (err) {
    return res.render("error", { data: "Bạn không có quyền truy cập." });
  }
};

module.exports.role = async (req, res, next) => {
  try {
    if (req.user.role === "member") {
      return res.render("error", { data: "Bạn không có quyền truy cập." });
    }

    next();
  } catch (err) {}
};
