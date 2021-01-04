const multer = require("multer");
const path = require("path");
const fs = require("fs");

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync("public/uploads")) {
      fs.mkdirSync("public/uploads");
    }
    if (!fs.existsSync(`public/uploads/${req.user.username}`)) {
      fs.mkdirSync(`public/uploads/${req.user.username}`);
    }
    cb(null, `public/uploads/${req.user.username}`);
  },
  filename: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    let name = path.basename(file.originalname, ext);
    let fileName = `${name}${ext}`;
    cb(null, fileName);
  },
});

let upload = multer({ storage: diskStorage }).array("files");

module.exports = upload;
