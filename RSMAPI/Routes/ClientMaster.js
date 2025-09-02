const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ClientMaster = require("../Models/ClientMasterModel");
const dbTenantConnection = require("../db/dbTenantConnection");
const authMiddleware = require("../Middleware/authMiddleware");
const ownerMasterSchema = require("../Models/OwnerMasterModel");

router.use(express.json());

// get all data
router.get("/clientmaster", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Owner") {
      return res.status(500).json({ message: "Access Denied" });
    }

    const getAll = await ClientMaster.model.find().populate("ownerMasters");

    if (getAll.length == 0) {
      return res
        .status(200)
        .json({ message: "Please enter at least one Client Master" });
    }
    res.json(getAll);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// get by id
router.get("/clientmaster/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Owner") {
      return res.status(500).json({ message: "Access Denied" });
    }

    const id = req.params.id;
    const getById = await ClientMaster.model
      .findById(id)
      .populate("ownerMasters");

    if (!getById) {
      return res.status(404).json({ message: "Client Master not found" });
    }
    res.json(getById);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// login client master
router.post("/clientmasterlogin", async (req, res) => {
  try {
    // finding a OwnerMaster
    await ClientMaster.model
      .findOne({
        email: req.body.email,
      })
      .then(async (clientMaster) => {
        // comparing a password
        const passwordCheck = await bcrypt.compare(
          req.body.password,
          clientMaster.password
        );
        try {
          if (!passwordCheck) {
            return res.status(400).send({
              message: "Passwords does not match",
              error,
            });
          }
          // generating a token
          const token = jwt.sign(
            {
              clientId: clientMaster._id,
              clientEmail: clientMaster.email,
              role: clientMaster.role,
            },
            "RANDOM-TOKEN",
            { expiresIn: "24h" }
          );
          return res.status(200).send({
            message: "Login Successful",
            clientMaster,
            token,
          });
        } catch (error) {
          // catch error if password do not match
          res.status(400).send({
            message: "Invalid credentials, Email or Password not found",
            error,
          });
        }
      })
      .catch((error) => {
        return res.status(404).json({
          message: "Unable to find ClientMaster",
          error,
        });
      });
  } catch (error) {
    return res.status(400).json({
      message: "Error connecting to the Database",
      error: error.message,
    });
  }
});

//create Client Master
router.post("/clientmaster", authMiddleware, async (req, res) => {
  try {
    // Ensure the user has the proper role
    if (req.user.role !== "Owner") {
      return res.status(403).json({ message: "Access Denied" });
    }

    const client = await ClientMaster.model.findOne({ email: req.body.email });

    if(client)
    {
      return res.status(200).json({message:'Client Already exist'})
    }

    // Check if the request body is empty
    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "Please enter some data for ClientMaster" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // Create the new ClientMaster object
    const clientMaster = new ClientMaster.model({
      name: req.body.name,
      gender: req.body.gender,
      fatherName: req.body.fatherName,
      address1: req.body.address1,
      address2: req.body.address2,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      password: hashedPassword,
      ownerMasters: req.body.ownerMasters, // Assuming it's a valid ObjectId
    });

    // Save the new client master
    await clientMaster.save();

    return res
      .status(201)
      .json({ message: "Client Master Created Successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error while saving ClientMaster",
      error: error.message,
    });
  }
});

// update rentmaster by id
router.put("/clientmaster/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Owner") {
      return res.status(500).json({ message: "Access Denied" });
    }
    const {
      name,
      gender,
      address1,
      email,
      password,
      address2,
      mobileNumber,
      fatherName,
      ownerMasters,
    } = req.body;

    // Ensure that the request body contains at least one field to update
    if (
      !name &&
      !gender &&
      !address1 &&
      !email &&
      !password &&
      !address2 &&
      !mobileNumber &&
      !fatherName &&
      !ownerMasters
    ) {
      return res.status(400).json({
        message: "At least one record is required for update",
      });
    }

    const updateData = await ClientMaster.model.findByIdAndUpdate(
      req.params.id,
      {
        name,
        gender,
        address1,
        email,
        password,
        address2,
        mobileNumber,
        fatherName,
        ownerMasters,
      },
      { new: true, runValidators: true }
    );

    if (!updateData) {
      return res
        .status(400)
        .json({ message: "Please enter correct Client MasterId" });
    }

    res.status(200).json({ message: "updated successfully" });
  } catch (error) {
    res.status(400).json({
      message: "Error,While updating Client Master",
      error: error.message,
    });
  }
});

// delete by id
router.delete("/clientmaster/:id", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Owner") {
      return res.status(500).json({ message: "Access Denied" });
    }
    const id = req.params.id;

    const deletedData = await ClientMaster.model.findByIdAndDelete(id);

    if (!deletedData) {
      return res.status(400).json({ message: "Client Master id not found" });
    }
    res.json({ message: `${id} is deletd successfully` });
  } catch (error) {
    res.status(500).json({
      message: "Error,While deleting Client Master",
      error: error.message,
    });
  }
});

//delete all
router.delete("/clientmaster", authMiddleware, async (req, res) => {
  try {
    if (req.user.role !== "Owner") {
      return res.status(500).json({ message: "Access Denied" });
    }

    const deletedData = await ClientMaster.model.deleteMany({});

    if (deletedData.deletedCount == 0) {
      return res
        .status(404)
        .json({ message: "No RentMaster records found to delete." });
    }

    res
      .status(200)
      .json({ message: "All Client Master records successfully deleted." });
  } catch (error) {
    res.status(500).json({
      message: "An error occurred while deleting Client Master records.",
      error: error.message,
    });
  }
});

module.exports = router;
