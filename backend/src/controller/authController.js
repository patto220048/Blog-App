import db from "../database/db.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import transport from "../mail/index.js";
import crypto from "crypto";

// create accsess token
const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user[0].id, admin: user[0].admin },
    process.env.JWT_ACCESS_KEY,
    { expiresIn: "15m" }
  );
};
// create refresh token
const generateRefeshToken = (user) => {
  return jwt.sign(
    { id: user[0].id, admin: user[0].admin },
    process.env.JWT_REFRESH_KEY,
    { expiresIn: "7d" }
  );
};

class authController {
  signup(req, res, next) {
    crypto.randomBytes(32, (err, buffer) => {
      if (err) return res.status(500).json("ErrCrypto: " + err.message);
      //check user exists
      const q = "SELECT * FROM users WHERE username = ? OR email= ?";
      db.query(q, [req.body.username, req.body.email], async (err, data) => {
        if (err) return res.status(500).json(err.message);
        //code generated code verify mail
        const codeVerifyMail = buffer.toString("hex");
        // check user exists in database
        if (data.length) return res.status(402).json("USER ALREADY EXISTS!!");
        //hash password
        const salt = await bcryptjs.genSaltSync(10);
        const hashPass = await bcryptjs.hashSync(req.body.password, salt);
        // add user
        const q =
          "INSERT INTO users (`email`,`username`,`password`,`verifyCode`) VALUE (?)";
        const values = [
          req.body.email,
          req.body.username,
          hashPass,
          codeVerifyMail,
        ];
        db.query(q, [values], (err, data) => {
          if (err) return res.status(500).json(err.message);
          return res.status(200).json("USER CREATED SUCESSFULL!!!");
        });
      });
    });
  }
  login(req, res, next) {
    //check login user with email
    const q = "SELECT * FROM users WHERE email = ?";
    console.log();
    db.query(q, [req.body.email], async (err, data) => {
      if (err) return res.status(500).json(err.message);
      if (data.length === 0) return res.status(404).json("USER NOT FOUND!!!");
      // check password
      const checkPass = await bcryptjs.compare(
        req.body.password,
        data[0].password
      );
      if (!checkPass) return res.status(400).json("WRONG PASSWORD OR EMAIL!!!");
      // save refresh token in database
      // sign access token
      const q = "UPDATE users SET `refreshToken`= ? WHERE `id` = ?";
      const access_token = generateAccessToken(data);
      // sign refresh token
      const refresh_token = generateRefeshToken(data);
      const VALUES = [refresh_token, data[0].id];
      db.query(q, [...VALUES], (err, user) => {
        if (err)
          return res
            .status(500)
            .json("Update refreshToken ERROR: " + err.message);
      });
      const { password, refreshToken, ...others } = data[0];
      return res
        .cookie("accsessToken", "Bearer " +access_token, {
          expires: new Date(Date.now() + 8 * 3600000),
          httpOnly: true,
          // secure: true
        })
        .status(200)
        .json({ ...others, access_token, refresh_token });
    });
  }
  refresh(req, res, next) {
    const refreshToken = req.body.token;
    if (!refreshToken)
      return res.status(401).json("You are not authenticated!");
    // TODO: check if refresh token
    const q = "SELECT * FROM users WHERE refreshToken = ?";
    const VALUES = [refreshToken];
    db.query(q, [...VALUES], (err, data) => {
      if (err)
        return res
          .status(500)
          .json("Select refresh token ERROR: " + err.message);
      // if token not found in database repons message
      if (data.length === 0)
        return res.status(403).json("Refresh token not valid");
      // It's OKE
      // verify refreshToken and create new access token, refresh token
      jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY, (err, user) => {
        if (err) return res.status(err).json(err.message);
        const newAccessToken = generateAccessToken(data);
        const newRefreshToken = generateRefeshToken(data);
        // assign newAccessToken to refreshToken in db
        const q = "UPDATE users SET `refreshToken`= ? WHERE `id` = ?";
        const VALUES = [newRefreshToken, req.user.id];
        db.query(q, [...VALUES], (err, data) => {
          if (err)
            return res
              .status(err)
              .json("Update new refresh token ERROR: " + err.message);
          return res
            .status(200)
            .json({
              access_token: newAccessToken,
              refresh_token: newRefreshToken,
            });
        });
      });
    });
  }
  logout(req, res) {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.status(405).json("Token not found!!");
    // set null refresh token
    const q = "UPDATE users SET refreshToken = null WHERE refreshToken = ?";
    db.query(q, [refreshToken], (err, data) => {
      if (err)
        return res
          .status(500)
          .json("Update refreshToken ERROR: " + err.message);
      
      return res.clearCookie("accsessToken").status(200).json("Log out successfully!!");
    });
  }
  resetPass(req, res, next) {
    // create token
    crypto.randomBytes(32, (err, buffer) => {
      if (err) return res.status(502).json("ErrCrypto: " + err);
      const token = buffer.toString("hex");
      //find user email
      const q = "SELECT * FROM users WHERE email = ?";
      db.query(q, req.body.email, (err, data) => {
        if (err) return res.status(500).json(err.message);
        if (data.length === 0) return res.status(404).json("USER NOT FOUND!!!");
        //save resetToken and resetTokenExp in database
        const q =
          "UPDATE users SET `resetToken` = ?, `resetTokenExpiration` =? WHERE email = ?";
        const VALUES = [token, Date.now() + 3600];
        db.query(q, [...VALUES, req.body.email], (err, data) => {
          if (err) return res.status(500).json(err.message);
          // send mail to user
          return transport.sendMail({
            from: "blog-app@space-social.online", // sender address
            to: req.body.email, // list of receivers
            subject: "Reset password", // Subject line
            // text: "Wellcome, blog-app", // plain text body
            html: `<p>You requested a password reset</p>
            <p>Plese click this link to set new password.<a href = "http://localhost:3000/api/auth/reset/${token}">http://localhost:3000/api/auth/reset/${token}</a></p>
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
    const resetPassToken = req.params.token;
    const q =
      "SELECT * FROM users WHERE resetToken = ? AND resetTokenExpiration <= ?";
    db.query(q, [resetPassToken, Date.now()], async (err, data) => {
      if (err) return res.status(503).json(err.message);
      if (data.length == 0)
        return res.status(403).json("Token invalid or expiration!!");
      // hash password again
      const salt = await bcryptjs.genSaltSync(10);
      const hashPass = await bcryptjs.hashSync(req.body.password, salt);
      // set new pass and delete resetToken and resetTokenExp current
      const q =
        "UPDATE users SET `password` = ?, `resetToken` = NULL , `resetTokenExpiration` = NULL WHERE resetToken = ? AND resetTokenExpiration <= ?";
      const VALUES = [hashPass];
      db.query(q, [...VALUES, resetPassToken, Date.now()], (err, data) => {
        if (err) return res.status(501).json(err.message);
        return res.status(200).json("Set password successfully!!");
      });
    });
  }
  verifyMail(req, res, next) {
    //check user
    const userEmail = req.query.email;
    const code = req.query.code;
    const q = "SELECT * FROM users  WHERE email = ?";
    db.query(q, [userEmail, code], (err, data) => {
      if (err) return res.status(503).json(err.message);
      if (data.length == 0) return res.status(404).json("User not found!!");
      // check generated code virify
      if (data[0].verifyCode == code) {
        // set verified email = true (1)
        const q =
          "UPDATE users SET `verified` = 1, `verifyCode` = NULL WHERE id = ?";
        const VALUES = [data[0].id];
        db.query(q, [...VALUES], (err, data) => {
          if (err) return res.status(503).json(err.message);
          return res.status(200).json("Verified successfully!!");
        });
      } else {
        return res.status(405).json("Verified something error!!");
      }
    });
  }

  sendMailVerify(req, res, next) {
    const email = req.body.email;
    // check email
    const q = "SELECT id,verifyCode,email FROM users WHERE email = ?";
    db.query(q, [email], (err, data) => {
      if (err) return res.status(503).json(err.message);
      if (data.length === 0) return res.status(404).json("User not found!!");
      // send email success message
      try {
        transport.sendMail({
          from: "blog-app@space-social.online", // sender address
          to: req.body.email, // list of receivers
          subject: "Verify email ✔", // Subject line
          text: "Wellcome, blog-app", // plain text body
          html: `<p>Click here verify your email !!!</p>
                <p>http://localhost:3000/api/auth/verify?email=${req.body.email}&code=${data[0].verifyCode}</p>`, // html body
        });
      } catch (error) {
        console.log(error);
      }
      return res.status(200).json(data);
    });
  }
}

export default new authController();
