import Tutor from "../../models/Tutor";
import connectDb from "../../middleware/mongoose";
const CryptoJS = require("crypto-js");
require('dotenv').config();

const handler = async (req, res) => {
  try {
    // Check if the request method is POST
    if (req.method === "POST") {
      // Destructure relevant fields from the request body
      const { name, email, password ,nationality } = req.body;

      // Create a new Tutor instance with encrypted password
      let staffID=Math.floor(Math.random()*1000000000000000);
      let tutor = new Tutor({
        staffID,
        name,
        email,
        password: CryptoJS.AES.encrypt(password,'ashbd').toString(),
        nationality
      });

      // Save the tutor to the database
      await tutor.save();

      // Respond with success status
      res.status(200).json({ success: "success" });
    } else {
      // Respond with bad request error for non-POST requests
      res.status(400).json({ error: "Bad Request" });
    }
  } catch (error) {
    // Log and respond with internal server error for exceptions
    console.error("Error processing request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default connectDb(handler);
