const { isNotEmpty } = require("../helpers/validate.helpers");
const { QueryPincodeDetailsByPincode } = require("../service/pincode.services");

const getPincodeDetailsByPincode = async (req, res) => {
  try {
    const pincode = req.body.pincode;
    if (!isNotEmpty(pincode)) {
      return res.status(402).json({ ok: false, message: "Enter pincode." });
    }
    const data = await QueryPincodeDetailsByPincode(pincode);
    if (data === false) {
      return res.status(402).json({ ok: false, message: "No details found." });
    }
    return res.status(200).json({ ok: true, pincodeDetails:data, message: "Pincode found." });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ ok: false, message: "Something went wrong." });
  }
};

module.exports = {
    getPincodeDetailsByPincode,
};
