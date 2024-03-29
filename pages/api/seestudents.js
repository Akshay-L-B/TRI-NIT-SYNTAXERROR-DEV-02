import Course from "../../models/Course";
import connectDb from "../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      // Extract the 'StudentID' query parameter from req.query
      const { CourseCode } = req.query;

      // Check if 'StudentID' is provided
      if (!CourseCode) {
        return res
          .status(400)
          .json({ error: "Missing 'Student ID' parameter" });
      }
      const course = await Course.find({
        CourseCode: CourseCode,
      });

      res.status(200).json(course);
    } catch (error) {
      console.error("Error fetching courses:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "Bad Request" });
  }
};

export default connectDb(handler);
