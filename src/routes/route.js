// ----------[ Import All Requirements]-----------
const express = require("express");
const router = express.Router();
const collegeController = require("../controllers/collegeController");
const internController = require("../controllers/internController");

// ==+==+==+====+==+==+==+=[ APIs ]==+==+==+==+===+==+==+==+=

//------------[ Create New College ]-------------
router.post("/functionup/colleges", collegeController.createCollege)

//------------[ Create New Intern ]-------------
router.post("/functionup/interns", internController.createIntern)

//------------[ Get List Of Intern for perticular College ]-------------
router.get("/functionup/collegeDetails",collegeController.collegeDetails)

module.exports = router;