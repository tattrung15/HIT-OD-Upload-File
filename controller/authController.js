const User = require("../model/User");
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(8);

module.exports.login = (req, res) => {
  res.render("login", { message: "" });
};

module.exports.postLogin = async (req, res) => {
  try {
    let userLogin = req.body;

    let userSearch = await User.findOne({ username: req.body.username });

    if (!userSearch) {
      return res.render("login", { message: "User does not exist." });
    }

    if (!bcrypt.compareSync(userLogin.password, userSearch.password)) {
      return res.render("login", { message: "Wrong password." });
    }

    res.cookie("userId", userSearch.username, {
      signed: true,
      httpOnly: true,
    });

    if (userSearch.username === "demo") {
      return res.redirect("/demo");
    }

    if (userSearch.username === "admin") {
      return res.redirect("/dashboard");
    }

    if (userSearch.type === "design") {
      res.redirect("/exam/design");
    } else {
      res.redirect("/exam/web");
    }
  } catch (error) {
    res.render("login", { message: "Error: Something wrong." });
  }
};

module.exports.signup = (req, res) => {
  res.render("signup", { message: "" });
};

module.exports.postSignup = async (req, res) => {
  try {
    let oldUser = await User.findOne({ username: req.body.username });
    let newUser = req.body;

    if (oldUser) {
      return res.render("signup", { message: "Username already exist." });
    }

    if (
      newUser.fullname.trim() === "" ||
      newUser.class.trim() === "" ||
      newUser.username.trim() === "" ||
      newUser.password.trim() === ""
    ) {
      return res.render("signup", { message: "Please complete the form." });
    }

    if (newUser.password !== newUser.repassword) {
      return res.render("signup", {
        message: "Please input the re password exactly.",
      });
    }

    newUser.password = bcrypt.hashSync(newUser.password, salt);
    delete newUser.repassword;
    await User.create(newUser);

    return res.render("login", { message: "Registered successfully" });
  } catch (error) {
    res.redirect("/auth/signup");
  }
};
