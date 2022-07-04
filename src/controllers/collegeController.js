// ==+==+==+==[Imports]==+==+==+==+=
const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel");


// ==+==+==+==[Validation Functions]==+==+==+==+=

const isValidBody = function (body) {
    return Object.keys(body).length > 0
}

// ==+==+==+====+==+==+==+=[ Create College ]==+==+==+==+===+==+==+==+=

const createCollege = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {
        let data = req.body
        if (!isValidBody(data)) return res.status(400).send({ status: false, message: "please provide data to Create" })

        let { name, fullName, logoLink} = data

        //-------[ Name Validation]

        if (!name) return res.status(400).send({ status: false, message: "Name Is required" });
        if (!(/^[A-Za-z]+$/.test(name)))
            return res.status(400).send({ status: false, message: "Name is Invalid" })

        //-------[ Name Validation]

        let checkId = await collegeModel.findOne({ name: name })
        if (checkId) return res.status(400).send({ status: false, message: "College name is already present" })

        //-------[ FullName Validation]

        if (!fullName) return res.status(400).send({ status: false, message: "Full Name Is required" });
        if (!(/^[A-Za-z_ (,)]+$/.test(fullName)))
            return res.status(400).send({ status: false, message: "Full Name is Invalid" })

        //-------[ Link Validation]

        if (!logoLink) return res.status(400).send({ status: false, message: "Logo Link Is required" });
        if (!(/(https|http?:\/\/.*\.(?:png|gif|webp|jpeg|jpg))/.test(logoLink)))
            return res.status(400).send({ status: false, message: "Logo Link is Invalid" })

        //-------[ Create ]

        let savedData = await collegeModel.create(data)
        let newData = {
            name: name, 
            fullName: fullName, 
            logoLink: logoLink,
            isDeleted: false 
        }
        res.status(201).send({ status: true, data: newData })

    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}

// ==+==+==+====+==+==+==+=[ Get College With Intern List ]==+==+==+==+===+==+==+==+=

const collegeDetails = async function (req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*')
    try {

        let clgName = req.query.collegeName;

        if (!clgName) return res.status(400).send({ status: false, message: "please provide query to search" })

        let data = await collegeModel.findOne({ name: clgName })

        if (!data) return res.status(400).send({ status: false, message: "College not found!" });

        let interns = await internModel.find({ collegeId: data._id.toString() }).select({ name: 1, email: 1, mobile: 1 })


        let { name, fullName, logoLink } = data

        let list = { name, fullName, logoLink, interns }

        if (interns.length === 0) {
            interns[0] = "No Interns for this college"
            return res.status(404).send({ status: false, data: list });
        }

        res.status(200).send({ status: true, data: list });

    }
    catch (err) {
        res.status(500).send({ status: false, message: err })
    }
}

module.exports.createCollege = createCollege
module.exports.collegeDetails = collegeDetails          
