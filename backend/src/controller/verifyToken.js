import jwt from "jsonwebtoken";

const verifyToken = {
  verifyUser : (req, res, next) => {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("You are not authenticated!!!");
    jwt.verify(token, process.env.JWT_KEY, (err, uid) => {
      if (err) return res.status(403).json("Token is invalid!!!");
      req.user = uid;
      next();
    });
  },
  verifyAdmin : (req, res, next) =>{
    verifyToken.verifyUser(req, res, ()=> {
      if (req.user.admin) {
        next();
      }
      else res.status(403).json("Permission not denie!!!");
    })
  }
  


}

export default verifyToken;
