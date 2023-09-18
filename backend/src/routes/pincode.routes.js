const router = require("express").Router();
const {
  getPincodeDetailsByPincode,
} = require("../controllers/pincode.controllers");

router.post("/by-pincode", getPincodeDetailsByPincode);

module.exports = router;