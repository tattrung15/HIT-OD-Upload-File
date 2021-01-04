const fs = require("fs");
module.exports = {
  viewDetail: (req, res) => {
    const data = fs.readdirSync("public/uploads/" + req.params.id);
    let image = [];
    let PSD = [];
    data.map((val) => {
      if (
        val.toLowerCase().indexOf("png") !== -1 ||
        val.toLowerCase().indexOf("jpg") !== -1 ||
        val.toLowerCase().indexOf("jpeg") !== -1
      ) {
        image.push(val);
      } else {
        PSD.push(val);
      }
    });
    console.log(PSD);
    console.log(image);
    res.render("design-details", { image, PSD, id: req.params.id });
  },
};
