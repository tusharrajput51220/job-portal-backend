import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
  try {
    // Check for token in the Authorization header
    const token = req.headers.authorization?.split(" ")[1]; // Assuming Bearer token format
    console.log("Token received:", token);

    if (!token) {
      return res.status(400).json({
        message: "User not authenticated",
        success: false,
      });
    }

    const decode = jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
      });
    }

    req.id = decode.userId; // Attach the user ID to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};

export default isAuthenticated;
