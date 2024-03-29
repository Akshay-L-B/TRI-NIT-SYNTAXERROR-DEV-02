import Test from "../../models/Test"; // Assuming Test is your mongoose model for courses
import connectDb from "../../middleware/mongoose";
const CryptoJS = require("crypto-js");
require("dotenv").config();

const handler = async (req, res) => {
  try {
    // Check if the request method is POST
    if (req.method === "POST") {
      // Destructure relevant fields from the request body
      const testData = req.body;
      console.log(testData);

      let test = new Test(testData);

      // Save the course to the database
      await test.save();

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
