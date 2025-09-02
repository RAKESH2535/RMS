const express = require("express");
const app = express();
const User = require("../Models/userModel");
const auth = require("../auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const OwnerMaster = require("../Models/OwnerMasterModel");
const ClientMaster = require("../Models/ClientMasterModel");

// register endpoint
app.post("/register", async (request, response) => {

  const user = await User.findOne({email:request.body.email})
  if(user)
  {
    return res.status(200).json({message:'User Already exist'})
  }
  // hash the password
  bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
      // create a new user instance and collect the data
      const user = new User({
        email: request.body.email,
        password: hashedPassword,
      });

      // save the new user
      user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
          response.status(201).send({
            message: "User Created Successfully",
            result,
          });
        })
        // catch erroe if the new user wasn't added successfully to the database
        .catch((error) => {
          response.status(500).send({
            message: "Error creating user",
            error,
          });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
      response.status(500).send({
        message: "Password was not hashed successfully",
        e,
      });
    });
});

// login endpoint
app.post("/login", async (request, response) => {
  // check if email exists
  let user = await User.findOne({ email: request.body.email });

  if (user) {
    try {
      const passwordCheck = await bcrypt.compare(
        request.body.password,
        user.password
      );
      try {
        if (!passwordCheck) {
          return response.status(400).send({
            message: "Passwords does not match",
            error,
          });
        }
        const token = jwt.sign(
          {
            userId: user._id,
            userEmail: user.email,
            role: user.role,
          },
          "RANDOM-TOKEN",
          { expiresIn: "24h" }
        );

        return response.status(200).send({
          message: "Login Successful",
          user,
          token,
        });
      } catch (error) {
        // catch error if password do not match
        response.status(400).send({
          message: "Passwords does not match",
          error,
        });
      }
    } catch (error) {
      response.status(404).send({
        message: "Email not found",
        e,
      });
    }
  }
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    const oldAdmin = await User.findOne({ email });
    const oldOwner = oldAdmin ? null : await OwnerMaster.findOne({ email });
    const oldClient = oldOwner ? null : await ClientMaster.model({ email });

    if (oldAdmin) {
      const secret = process.env.JWT_SECRET + oldAdmin.password;
      const token = jwt.sign(
        { email: oldAdmin.email, id: oldAdmin._id },
        secret,
        {
          expiresIn: "5m",
        }
      );
      const link = `http://localhost:3000/resetpassword?id=${oldAdmin._id}&token=${token}`;

      // await sendEmail(oldAdmin.id, "Password reset", link)

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "st9889477@gmail.com",
          pass: "ldkl jltb bmao bgoq",
        },
      });

      var mailOptions = {
        from: "st9889477@gmail.com",
        to: "st9889477@gmail.com",
        subject: "Password",
        text: `We have received a request to reset your password. Please reset your password using the link below. ${link} 
      ,Reset Password`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({ error: error.message });
        } else {
          res.send("A password reset link sent to your Email Account");
        }
      });
    } else if (oldOwner) {
      const secret = process.env.JWT_SECRET + oldOwner.password;
      const token = jwt.sign(
        { email: oldOwner.email, id: oldOwner._id },
        secret,
        {
          expiresIn: "5m",
        }
      );
      const link = `http://localhost:5000/resetpassword?id=${oldOwner._id}&token=${token}`;

      // await sendEmail(oldAdmin.id, "Password reset", link)

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "st9889477@gmail.com",
          pass: "ldkl jltb bmao bgoq",
        },
      });

      var mailOptions = {
        from: "st9889477@gmail.com",
        to: "st9889477@gmail.com",
        subject: "Password",
        text: `We have received a request to reset your password. Please reset your password using the link below. ${link} 
      ,Reset Password`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({ error: error.message });
        } else {
          res.send("A password reset link sent to your Email Account");
        }
      });
    } else if (oldClient) {
      const secret = process.env.JWT_SECRET + oldClient.password;
      const token = jwt.sign(
        { email: oldClient.email, id: oldClient._id },
        secret,
        {
          expiresIn: "5m",
        }
      );
      const link = `https://localhost:5000/resetpassword?id=${oldClient._id}&token=${token}`;

      // await sendEmail(oldAdmin.id, "Password reset", link)

      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "email@gmail.com ",
          pass: "ldkl jltb bmao bgoq",
        },
      });

      var mailOptions = {
        from: "email@gmail.com",
        to: "email@gmail.com",
        subject: "Password",
        text: `We have received a request to reset your password. Please reset your password using the link below. ${link} 
      ,Reset Password`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          res.json({ error: error.message });
        } else {
          res.send("A password reset link sent to your Email Account");
        }
      });
    } else {
      return res.json({ message: "User does not Exist!!" });
    }
  } catch (error) {
    res.status(400).send({ message: "Somethind Went Wrong" });
  }
});

// app.get("/resetpassword/:id/:token", async (req, res) => {
//   const { id, token } = req.params;
//   const oldAdmin = await User.findOne({ _id: id });

//   if (!oldAdmin) {
//     return res.json({ status: "User not Exist!!" });
//   }
//   const secret = process.env.JWT_SECRET + oldAdmin.password;

//   try {
//     const verify = jwt.verify(token, secret);
//     res.json("verifed");
//   } catch (error) {
//     res.send("not verified");
//   }
// });

app.post("/resetpassword/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;
  const oldAdmin = await User.findOne({ _id: id });
  const oldOwner = oldAdmin ? null : await OwnerMaster.findOne({ _id: id });
  const oldClient = oldOwner ? null : await ClientMaster.model({ _id: id });

  if (oldAdmin) {
    try {
      const secret = process.env.JWT_SECRET + oldAdmin.password;
      const verify = jwt.verify(token, secret);
      if (!verify) {
        return res.json({ message: "Reset Password link is expired!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );
      res.json({ status: "Password Reset Successfully!!", verify });
    } catch (error) {
      res.json({ error: error.message });
    }
  } else if (oldOwner) {
    try {
      const secret = process.env.JWT_SECRET + oldAdmin.password;
      const verify = jwt.verify(token, secret);
      if (!verify) {
        return res.json({ message: "Reset Password link is expired!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );
      res.json({ status: "Password Reset Successfully!!", verify });
    } catch (error) {
      res.json({ error: error.message });
    }
  } else if (oldClient) {
    try {
      const secret = process.env.JWT_SECRET + oldAdmin.password;
      const verify = jwt.verify(token, secret);
      if (!verify) {
        return res.json({ message: "Reset Password link is expired!" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      await User.updateOne(
        {
          _id: id,
        },
        {
          $set: {
            password: hashedPassword,
          },
        }
      );
      res.json({ status: "Password Reset Successfully!!", verify });
    } catch (error) {
      res.json({ error: error.message });
    }
  } else {
    return res.json({ status: "User not Exist!!" });
  }
});
// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});

// free endpoint
app.get("/free-endpoint", (request, response) => {
  response.json({ message: "You are free to access me anytime" });
});

// authentication endpoint
app.get("/auth-endpoint", auth, (request, response) => {
  response.send({ message: "You are authorized to access me" });
});

module.exports = app;
