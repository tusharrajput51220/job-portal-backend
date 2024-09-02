import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;  // Use cookie-parser to get cookies
        // console.log("uu",token)

        if (!token) {
            return res.status(400).json({
                message: "User not authenticated",
                success: false,
            });
        }

        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(400).json({
                message: "Invalid token",
                success: false,
            });
        }

        req.id = decode.userId;
        next();
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false,
        });
    }
};

export default isAuthenticated;
