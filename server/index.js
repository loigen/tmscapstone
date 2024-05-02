const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const TmsModel = require("./models/tmsdb");

const app = express();
app.use(express.json());
app.use(cors());

const db =
  "mongodb+srv://lariosaloigen5:loigenarnado123@tmsdb.gspnrds.mongodb.net/tmsdb";

app.post("/register", async (req, res) => {
  const { fname,mname,lname,gender,dob, email, password, confirmPassword } = req.body;
  const tms = new TmsModel({ fname,mname,lname,gender,dob, email, password, confirmPassword });

  try {
    const existingUser = await TmsModel.findOne({ email });
    if (password !== confirmPassword) {
      return res
        .status(200)
        .json({ message: "Passwords do not match", error: true });
    }
    if (existingUser) {
      return res
        .status(200)
        .json({ message: "Account already exists", error: true });
    }

    if (password.length < 4)
      return res
        .status(200)
        .json({ message: "Password length must atleast 4", error: true });

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
      return res
        .status(200)
        .json({ message: "User not found", error: true });
    }

    if (existingUser.password !== password) {
      return res
        .status(200)
        .json({ message: "Incorrect password", error: true });
    }

    // Here you can set up a session or token for authentication
    // For example, you can use JWT token to manage sessions

    res.status(200).json({ message: "Login successful", error: false });
  } catch (error) {
    res.status(400).send(error);
  }
});

app.post("/lol", async (req, res) => {
  res.json({ hi: "hi" });
});

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
