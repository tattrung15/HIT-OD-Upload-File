const authRoute = require("./authRoute");
const uploadRoute = require("./uploadRoute");
const fileRoute = require("./fileRoute");
const viewUploadRouter = require("./viewUploadRouter");
const examRouter = require("./examRouter");

module.exports = (app) => {
  app.use("/", uploadRoute);
  app.use("/auth", authRoute);
  app.use("/dashboard", fileRoute);
  app.use("/uploads", viewUploadRouter);
  app.use("/exam", examRouter);
};
