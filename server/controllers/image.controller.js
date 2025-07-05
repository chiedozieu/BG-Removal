import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import User from "../models/user.model.js";

// Function to remove background from an image
const removeBackgroundImage = async (req, res) => {
  try {
    // const { clerkId } = req.body;
    const clerkId = req.clerkId;

    const user = await User.findOne({ clerkId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (user.creditBalance === 0) {
      return res.json({
        success: false,
        message: "Insufficient credit balance",
        creditBalance: user.creditBalance,
      });
    }
    const imagePath = req.file.path;

    const imageFile = fs.createReadStream(imagePath);
    const formData = new FormData();
    formData.append("image_file", imageFile);

    const { data } = await axios.post(
      "https://clipdrop-api.co/remove-background/v1",
      formData,
      {
        method: "POST",
        headers: {
          "x-api-key": process.env.CLIPDROP_API_KEY,
        },
        responseType: "arraybuffer",
      }
    );
    const base64Image = Buffer.from(data, "binary").toString("base64");

    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`;

    await User.findByIdAndUpdate(user._id,  {creditBalance: user.creditBalance - 1})

    res.status(200).json({
      success: true,
      resultImage,
      creditBalance: user.creditBalance - 1,
        message: "Background removed ",
    });

  } catch (error) {
    console.error("Error removing background:", error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to remove background" });
  }
};

export { removeBackgroundImage };
