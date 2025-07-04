import jwt from "jsonwebtoken";

//middleware to decode jwt token to get clerkId

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.json({ success: false, message: "Unauthorized" });
    }
    const token_decode = jwt.decode(token);

    req.clerkId = token_decode.clerkId;
    next();
  } catch (error) {
    console.log("Error in auth middleware", error.message, error);
    res.json({ success: false, message: "Unauthorized" });
  }
};

export default authUser;
