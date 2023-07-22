const sharp = require("sharp");
const fs = require("fs");
const path = require("path");
const {
  guessExtensionFromType,
  guessTypeFromExtension,
} = require("./mimeTypes.helpers");

// generate random (unique) image name
function getRandomFileName() {
  var timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  var random = ("" + Math.random()).substring(2, 8);
  var random_number = timestamp + random;
  return random_number;
}

// Image Upload
const fileUpload = async (
  file,
  destination = "images/",
  allowedExtensions = [],
  thumbnail = false,
  height = 200,
  width = 200,
  minFileSizeInMB = 0,
  maxFileSizeInMB = 10
) => {
  try {
    //destination for upload files
    const uploadFilepath = `${__dirname}/../public/data/${destination}`;
    //generate random (unique) image name
    const uniqueName = getRandomFileName();

    const fileExt = path.extname(file.name).replace(".", ""); //file extension
    const fileMimetype = file.mimetype; //file mimetype
    const fileSizeInMB = parseFloat(file.size / (1024 * 1024)).toFixed(2); //file size in mb

    //create file names
    const fileName = `${uniqueName}.${fileExt}`;
    const thumbnailFileName = `${uniqueName}_w${height}_h${width}.${fileExt}`;

    //check extension or mimetype
    const checkedExt = await guessExtensionFromType(fileMimetype, fileExt);
    if (checkedExt !== fileExt) {
      throw new Error(`Not an "${fileExt}" type file.`);
    }

    //check allowed files by  extension
    if (allowedExtensions.length !== 0) {
      if (!allowedExtensions.includes(fileExt)) {
        throw new Error(
          `Only ${allowedExtensions.join("|")} files are allowed.`
        );
      }
    }

    //upload image size limit
    if (fileSizeInMB > maxFileSizeInMB) {
      throw new Error(
        `Please select files size less than ${maxFileSizeInMB} MB.`
      );
    }
    if (fileSizeInMB < minFileSizeInMB) {
      throw new Error(
        `Please select files size more than ${minFileSizeInMB} MB.`
      );
    }

    // check dir exist befor upload file
    if (!fs.existsSync(uploadFilepath)) {
      fs.mkdirSync(uploadFilepath, { recursive: true }, (err) => {
        throw new Error(err.message);
      });
    }

    //upload file
    await file.mv(`${uploadFilepath}${fileName}`, (err) => {
      if (err) {
        throw new Error(err.message);
      } else {
        if (thumbnail === true) {
          sharp(`${uploadFilepath}${fileName}`)
            .resize(width,height)
            .toFile(`${uploadFilepath}${thumbnailFileName}`, function (err) {
              if (err) {
                throw new Error(err.message);
              } else {
              }
            });
        }
      }
    });

    return {
      ok: true,
      status: `success`,
      message: `file successfully uploaded.`,
      fileName,
      filePath: `${uploadFilepath}${fileName}`,
    };
  } catch (err) {
    console.log(err);
    return { ok: false, status: `failure`, message: err.message };
  }
};

//Function Doc =>
/*
const imageUploadParameters = {
  file: {
    isMandatory: true,
    value: "file",
    type: "object",
  },
  destination: {
    isMandatory: false,
    value: "destination of file where store ( after public/data/ )",
    type: "string",
    defaultValue: "upload-data/",
  },
  allowedExtensions: {
    isMandatory: false,
    value: ["pdf", "jpg", "...etc"],
    type: "array",
    defaultValue: [], //all ext allowed
  },
  maxFileSizeInMB: {
    isMandatory: false,
    value: 10,
    type: "int",
    defaultValue: 10,
  },
  minFileSizeInMB: {
    isMandatory: false,
    value: 0,
    type: "int",
    defaultValue: 0,
  },
  thumbnail: {
    isMandatory: false,
    value: true,
    type: "boolean",
    defaultValue: false,
  },
};
*/

/*****************************END*****************************/
module.exports = {
  fileUpload,
  getRandomFileName,
};
