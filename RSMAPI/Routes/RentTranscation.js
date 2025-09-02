const express = require("express");
const router = express();
const PropertyMasterSchema = require("../Models/PropertyMasterModel");
const dbTenantConnection = require("../db/dbTenantConnection");
const authMiddleware = require("../Middleware/authMiddleware");
const rentMasterSchema = require("../Models/RentMasterModel");
const RentTranscation = require("../Models/RentTranscationModel");

router.use(express.json());

router.get("/rentTranscation", authMiddleware, async (req, res) => {
  try {
    if (req.user.role == "Owner" || req.user.role == "ClientMaster") {
      const getAll = await RentTranscation.model
      .find()
      .populate("propertyMaster").populate('clientMaster')
      .populate("rentMaster")
      .populate("ownerMasters");

    return res.json(getAll);
    }
    return res.status(500).json({ message: "Access Denied" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
});

router.get("/rentTranscation/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Owner" && req.user.role !== "ClientMaster") {
      return res.status(500).json({ message: "Access Denied" });
    }

    const getAll = await RentTranscation.model
      .findById(req.params.id)
      .populate("propertyMaster").populate('clientMaster')
      .populate("rentMaster")
      .populate("ownerMasters");

    res.json(getAll);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
});

router.post("/rentTranscation", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Owner" && req.user.role !== "ClientMaster") {
      return res.status(500).json({ message: "Access Denied" });
    }

    if (Object.keys(req.body).length == 0) {
      return res.status(400).json({ message: "Invalid request body" });
    }
    const rentTranscationData = new RentTranscation.model(req.body);

    await rentTranscationData.save();
    res.status(200).json({ message: "RentRecipt saved to the database" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save data", error: error.message });
  }
});

module.exports = router;
