const express = require("express");
const router = express();
const PropertyMaster = require("../Models/PropertyMasterModel");
const dbTenantConnection = require("../db/dbTenantConnection");
const authMiddleware = require("../Middleware/authMiddleware");
const ownerMasterSchema = require("../Models/OwnerMasterModel");

router.use(express.json());

// get all
router.get("/propertymaster", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Owner") {
      return res.status(500).json({ message: "Access Denied" });
    }
    const getAll = await PropertyMaster.model.find().populate("ownerMasters");
    res.json(getAll);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
});

//get by id
router.get("/propertymaster/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Owner") {
      return res.status(500).json({ message: "Access Denied" });
    }

    const propertyMasterId = req.params.id;
    const getById = await PropertyMaster.model
      .findById(propertyMasterId)
      .populate("ownerMasters");
    if (!getById) {
      res.status(400).json({ message: "PropertyMaster not found" });
    }

    res.json(getById);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve data", error: error.message });
  }
});

// create
router.post("/propertymaster", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Owner") {
      return res.status(500).json({ message: "Access Denied" });
    }

    const propertyMasterData = new PropertyMaster.model(req.body);

    if (req.body === "") {
      res.status(400).json({ message: "Invalid request body" });
    }

    await propertyMasterData.save();
    res.status(200).json({ message: "PropertyMaster saved to the database" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to save data", error: error.message });
  }
});

// update propertymaster by id
router.put("/propertymaster/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Owner") {
      return res.status(500).json({ message: "Access Denied" });
    }

    const propertyMasterId = req.params.id;
    const { id, pincode, address2, city, address1, ownerMasters, state } =
      req.body;

    // Ensure that the request body contains at least one field to update
    if (
      !pincode &&
      !address2 &&
      !city &&
      !address1 &&
      !ownerMasters &&
      !id &&
      !state
    ) {
      return res.status(400).json({
        message:
          "At least one field (id,pincode,address2,city,address1,ownerMasters,state) is required for update",
      });
    }

    const updatedData = await PropertyMaster.model.findByIdAndUpdate(
      propertyMasterId,
      { pincode, address2, city, address1, ownerMasters, id, state },
      { new: true, runValidators: true }
    );

    if (!updatedData) {
      return res
        .status(404)
        .json({ message: "OwnerMasterId not found for updation" });
    }

    res.json({ message: "update successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating data", error: error.message });
  }
});

// delete
router.delete("/propertymaster/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Owner") {
      return res.status(500).json({ message: "Access Denied" });
    }

    const getID = req.params.id;
    const deleteById = await PropertyMaster.model.findByIdAndDelete(getID);

    if (!deleteById) {
      return res.status(404).json({
        message: "Please enter correct PropertyMasterId for deletion",
      });
    }

    res.json({ message: `${req.params.id} deleted successfully` });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete the PropertyMaster",
      error: error.message,
    });
  }
});

//delete all
router.delete("/propertymaster", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Owner") {
      return res.status(500).json({ message: "Access Denied" });
    }

    const propertymaster = await PropertyMaster.model.deleteMany({});

    if (propertymaster.deletedCount == 0) {
      return res
        .status(404)
        .json({ message: "No RentMaster records found to delete." });
    }
    res
      .status(200)
      .json({ message: "All property master data deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete the post",
      error: error.message,
    });
  }
});

module.exports = router;
