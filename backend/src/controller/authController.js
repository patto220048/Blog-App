import db from "../database/db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

class authController {
  signup(req, res) {
    //check user exists
    const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(q, [req.body.username, req.body.email], (err, data) => {
      if (err) return res.status(500).json(err.message);
      if (data.length) return res.status(409).json("USER ALREADY EXISTS!!");
      const salt = bcryptjs.genSaltSync(10);
      const hashPass = bcryptjs.hashSync(req.body.password, salt);

      const q = "INSERT INTO users (`email`,`username`,`password`) VALUE (?)";
      const values = [req.body.email, req.body.username, hashPass];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err.message);

        return res.status(200).json("USER CREATED SUCESSFULL!!!");
      });
    });
  }
  login(req, res) {
    //check login user with email
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email], (err, data) => {
      if (err) return res.status(500).json(err.message);
      if (data.length === 0) return res.status(404).json("USER NOT FOUND!!!");
      const checkPass = bcryptjs.compare(req.body.password, data[0].password);
      if (!checkPass) return res.status(400).json("WRONG PASSWORD OR EMAIL!!!");
      const token = jwt.sign({ id: data[0].id }, process.env.JWT_KEY);
      const { password, ...others } = data[0];
      res
        .cookie("accessToken", token, {
          httpOnly: true,
        })
        .status(200)
        .json(others);
    });
  }
  logout(req, res) {
    res
      .clearCookie("accessToken", {
        secure: true,
        sameSite: "none",
      })
      .status(200)
      .json("USER HAS BEEN LOGOUT!!!");
  }
}

export default new authController();
