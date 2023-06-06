import db from "../database/db.js";

class postController {
  getPosts(req, res, next) {
    const q = req.query.tag
      ? "SELECT FROM posts WHERE tags=?"
      : "SELECT * FROM posts";
    db.query(q, [req.query.tag], (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json(data);
    });
  }
  getPost(req, res, next) {
    const q =
      "SELECT `email`,`username`, `avatar`, `title`, `desc`,`img`, `date`, `tags`, `like` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
  }
  addPost(req, res, next) {}
  deletePost(req, res, next) {}
  updatePost(req, res, next) {}
}

export default new postController();
