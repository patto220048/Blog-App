import db from "../database/db.js";
import createErrorMessage from "../errors/handleErr.js";
class userController {
  getUsers(req, res, next) {
    const query = req.query.username || req.query.email || req.query.id;
    const q = query
      ? `SELECT id, email, username, verified, avatar, admin 
        FROM users 
        WHERE username = ? OR email = ? OR id = ?
        ORDER BY id, username ASC
        LIMIT 10
        `
      : `SELECT id, email, username, verified, avatar, admin 
            FROM users
            ORDER BY id ASC
            LIMIT 10
        `;
    const VALUES = [req.query.username, req.query.email, req.query.id];
    db.query(q, [...VALUES], (err, data) => {
      if (err) return res.json(createErrorMessage(500, 'Select users err ' + err.message));
      if (data.length === 0) return res.json(createErrorMessage(404, 'User not found!'));
      return res.status(200).json(data[0]);
    });
  }

  getUser(req, res, next) {
    console.log(process.env.PASS_MYSQL)
    const userId = req.params.userId;
    const q =
      "SELECT id, email, username, verified, avatar, admin FROM users WHERE id = ?";
    db.query(q, [userId], (err, data) => {
      if (err) return res.json(createErrorMessage(500,'Select users err ' + err.message));
      if (data.length === 0) return res.json(createErrorMessage(404,'User not found!'));
      return res.status(200).json(data[0]);
    });
  }
}

export default new userController();
