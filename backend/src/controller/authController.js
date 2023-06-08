import db from "../database/db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import transport from "../mail/index.js";
import crypto from "crypto";
import moment from "moment";
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
        console.log(process.env.USER_MAIL);
        try {
          transport.sendMail({
            from: "blog-app@space-social.online", // sender address
            to: req.body.email, // list of receivers
            subject: "Sign up ✔", // Subject line
            text: "Wellcome, blog-app", // plain text body
            html: "<p>Your account signup suscessfull !!!</p>", // html body
          });
        } catch (error) {
          console.log(error);
        }
        return res.status(200).json("USER CREATED SUCESSFULL!!!");
      });
    });
  }
  login(req, res, next) {
    //check login user with email
    const q = "SELECT * FROM users WHERE email = ?";
    db.query(q, [req.body.email, req.body.password], (err, data) => {
      if (err) return res.status(500).json(err.message);
      if (data.length === 0) return res.status(404).json("USER NOT FOUND!!!");
      const checkPass = bcryptjs.compare(req.body.password,  data[0].password);
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
  resetPass(req, res, next) {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) return res.status(502).json(err);
      const token = buffer.toString("hex");
      const q = "SELECT * FROM users WHERE email = ?";
      db.query(q, req.body.email, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("USER NOT FOUND!!!");
        data[0].resetToken = token;
        data[0].resetTokenExpiration = Date.now() + 3600000;
        try {
          transport.sendMail({
            from: "blog-app@space-social.online", // sender address
            to: req.body.email, // list of receivers
            subject: "Reset password", // Subject line
            // text: "Wellcome, blog-app", // plain text body
            html: `<p>You requested a password reset</p>
            <p>Plese click this link to set new password.<a href = "http://localhost:3000/api/auth/reset/${token}">${token}</a></p>
            `, // html body
          });
        } catch (error) {
          console.log(error);
        }
        return res.status(200).json(data[0]);
      });
    });
  }
  newPass(req, res, next) {
    const token = req.params.token;
    const q =
      "SELECT * FROM users WHERE resetToken =? AND resetTokenExpiration <= ?";
    db.query(q, [token, Date.now()], (err, user) => {
      if (err) return res.status(500).json("Token is invalid or expired!!");
      const salt = bcryptjs.genSaltSync(10);
      const hashPass = bcryptjs.hashSync(req.body.password, salt);
      const q = "UPDATE users SET `password` = ? ";
      db.query(q, [hashPass], (err, data) => {
        if (err) return res.status(500).json(err);
        return res.status(200).json(data[0]);
      });
    });
  }
}

export default new authController();
