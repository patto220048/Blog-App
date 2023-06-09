import db from "../database/db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import transport from "../mail/index.js";
import crypto from "crypto";
import moment from "moment";
import { ifError } from "assert";
class authController {
  signup(req, res) {
    //check user exists
    const q = "SELECT * FROM users WHERE username = ? OR email = ?";
    db.query(q, [req.body.username, req.body.email], (err, data) => {
      if (err) return res.status(500).json(err.message);
      // check user exists in database
      if (data.length) return res.status(409).json("USER ALREADY EXISTS!!");
      //hash password
      const salt = bcryptjs.genSaltSync(10);
      const hashPass = bcryptjs.hashSync(req.body.password, salt);
      // add user
      const q = "INSERT INTO users (`email`,`username`,`password`) VALUE (?)";
      const values = [req.body.email, req.body.username, hashPass];
      db.query(q, [values], (err, data) => {
        if (err) return res.status(500).json(err.message);
        // send email success message
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
    db.query(q, [req.body.email], async (err, data) => {
      if (err) return res.status(500).json(err.message);
      if (data.length === 0) return res.status(404).json("USER NOT FOUND!!!");
      // check password
      const checkPass = await bcryptjs.compare(
        req.body.password,
        data[0].password
      );
      if (!checkPass) return res.status(400).json("WRONG PASSWORD OR EMAIL!!!");
      // sign json wed token
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
    // create token
    crypto.randomBytes(32, (err, buffer) => {
      if (err) return res.status(502).json(err);
      const token = buffer.toString("hex");
      //find user email
      const q = "SELECT * FROM users WHERE email = ?";
      db.query(q, req.body.email, (err, data) => {
        if (err) return res.status(500).json(err);
        if (data.length === 0) return res.status(404).json("USER NOT FOUND!!!");
        //save resetToken and resetTokenExp in database
        const q =
          "UPDATE users SET `resetToken` = ?, `resetTokenExpiration` =? WHERE email = ?";
        const VALUES = [token, Date.now()+3600];
        db.query(q, [...VALUES, req.body.email], (err, data) => {
          if (err) return res.status(500).json(err.message);
          // send mail to user
          return  transport.sendMail({
            from: "blog-app@space-social.online", // sender address
            to: req.body.email, // list of receivers
            subject: "Reset password", // Subject line
            // text: "Wellcome, blog-app", // plain text body
            html: `<p>You requested a password reset</p>
            <p>Plese click this link to set new password.<a href = "http://localhost:3000/api/auth/reset/${token}">${token}</a></p>
            `, // html body
          });
        });
        return res.status(200).json("Request reset password successful!!");
      });
    });
  }
  // new password
  async newPass(req, res, next) {
    //check token
    const token = req.params.token;
    const q = "SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiration <= ?"
    db.query(q,[token, Date.now()], async (err, data)=>{
      if (err) return res.status(503).json(err.message)
      if (data.length == 0) return res.status(403).json("Token invalid or expiration!!")
      // hash password again
      const salt = await bcryptjs.genSaltSync(10);
      const hashPass = await bcryptjs.hashSync(req.body.password, salt);
      // set new pass and delete resetToken and resetTokenExp current
      const q =
        "UPDATE users SET `password` = ?, `resetToken` = NULL , `resetTokenExpiration` = NULL WHERE resetToken = ? AND resetTokenExpiration <= ?";
      const VALUES = [hashPass]
      db.query(q, [...VALUES, token, Date.now()], (err, data) => {
        if (err) return res.status(501).json(err.message);
        return res.status(200).json("Set password successfully!!")
      });
    })
   
  
   
  }
}

export default new authController();
