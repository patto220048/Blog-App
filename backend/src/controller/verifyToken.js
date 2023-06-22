import jwt from "jsonwebtoken";

const verifyToken = {
  verifyUser: (req, res, next) => {
    const authHeader = req.headers.authorization || req.cookies.accsessToken;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, uid) => {
        if (err) return res.status(401).json("Token is invalid!!!");
        req.user = uid;
        next();
      });
    } else res.status(401).json("You are not authenticated!!!");
  },
  verifyAdmin: (req, res, next) => {
    verifyToken.verifyUser(req, res, () => {
      if (req.user.admin === 1) {
        next();
      } else res.status(403).json("Permission not denie!!!");
    });
  },
};

export default verifyToken;
