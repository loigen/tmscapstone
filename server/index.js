const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TmsModel = require("./models/tmsdb");
const jwt = require("jsonwebtoken"); // Import JWT package
const crypto = require("crypto"); // Import crypto module for generating random secret key

const app = express();
app.use(express.json());
app.use(cors());

const db =
  "mongodb+srv://lariosaloigen5:loigenarnado123@tmsdb.gspnrds.mongodb.net/tmsdb";

const secretKey = crypto.randomBytes(32).toString("hex");

app.post("/register", async (req, res) => {
  const { fname, mname, lname, gender, dob, email, password, confirmPassword } = req.body;
  const tms = new TmsModel({ fname, mname, lname, gender, dob, email, password, confirmPassword });

  try {
    const existingUser = await TmsModel.findOne({ email });
    if (password !== confirmPassword) {
      return res.status(200).json({ message: "Passwords do not match", error: true });
    }
    if (existingUser) {
      return res.status(200).json({ message: "Account already exists", error: true });
    }

    if (password.length < 4)
      return res.status(200).json({ message: "Password length must be at least 4", error: true });

    await tms.save();

    res.status(201).send(tms);
  } catch (error) {
    res.status(400).send(error);
  }
});
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await TmsModel.findOne({ email });

    if (!existingUser) {
      return res.status(200).json({ message: "User not found", error: true });
    }

    if (existingUser.password !== password) {
      return res.status(200).json({ message: "Incorrect password", error: true });
    }

    // Generate JWT token upon successful login
    const token = jwt.sign({ email: existingUser.email }, secretKey, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", error: false, token });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.get("/protected", verifyToken, (req, res) => {
  // If the token is verified, it means the user is authenticated
  res.json({ message: "Protected route accessed successfully" });
});
function verifyToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(403).json({ message: "Token not provided", error: true });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Unauthorized", error: true });
    }
    req.user = decoded;
    next();
  });
}
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
