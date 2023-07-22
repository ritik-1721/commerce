// Load required module
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const staticImage = async (req, res) => {
  try {
    const img = req.params.image;
    const w = req.query.w;
    const h = req.query.h;
    let filePath = path.join(__dirname, `/../public/data/images/${img}`);
    if (!fs.existsSync(filePath)) {
      file = process.env.DEFAULT_IMAGE;
      filePath = path.join(__dirname, `/../public/data/images/default.jpg`);
    }

    if (w === undefined && h === undefined) {
      res.sendFile(path.resolve(filePath));
      return;
    }

    let name = path.parse(filePath).name;
    let ext = path.parse(filePath).ext;

    const out_file = path.join(
      __dirname,
      `/../public/data/images/${name}_w${w}_h${h}${ext}`
    );
    if (fs.existsSync(path.resolve(out_file))) {
      res.sendFile(path.resolve(out_file));
      return;
    }

    sharp(`${filePath}`)
      .resize(Number(w), Number(h))
      .toFile(`${out_file}`)
      .then(() => {
        res.sendFile(out_file);
      });
  } catch (error) {
    res.sendFile(path.join(__dirname, `/../public/data/images/default.jpg`));
  }
};

module.exports = { staticImage };
