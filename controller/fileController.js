const fs = require("fs");
const User = require("../model/User");

const des = "public/uploads/";

module.exports.getAllFiles = async (req, res) => {
  if (!fs.existsSync("public/uploads")) {
    fs.mkdirSync("public/uploads");
  }

  const listFolderName = fs.readdirSync(des);
  if (!listFolderName) {
    return res.send("No such file");
  }
  const listWeb = await User.find({
    type: "web",
  });
  const listDesign = await User.find({
    type: "design",
  });

  let countListWeb = 0;
  let countListDesign = 0;

  listWeb.map((val, index) => {
    if (val.link) {
      countListWeb++;
    }
  });

  listDesign.map((val, index) => {
    if (val.link) {
      countListDesign++;
    }
  });

  res.render("dashboard", {
    user: req.user,
    countWeb: listWeb.length,
    countDesign: listDesign.length,
    submittedWeb: countListWeb,
    submittedDesign: countListDesign,
  });
};

module.exports.getFileWeb = async (req, res) => {
  if (!fs.existsSync("public/uploads")) {
    fs.mkdirSync("public/uploads");
  }

  const listFolderName = fs.readdirSync(des);
  if (!listFolderName) {
    return res.send("No such file");
  }
  const listUser = await User.find();

  res.render("web", {
    data: listFolderName,
    user: req.user,
    submitted: listFolderName.length,
    listUser,
  });
};

module.exports.getFileDesign = async (req, res) => {
  if (!fs.existsSync("public/uploads")) {
    fs.mkdirSync("public/uploads");
  }

  const listFolderName = fs.readdirSync(des);
  if (!listFolderName) {
    return res.send("No such file");
  }
  const listUser = await User.find();

  res.render("design", {
    data: listFolderName,
    user: req.user,
    submitted: listFolderName.length,
    listUser,
  });
};
