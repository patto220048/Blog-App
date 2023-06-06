import db from "../database/db.js";
import moment from "moment";
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
      "SELECT p.id, `email`,`username`, `avatar`, `title`, `desc`,`img`, `date`, `tags`, `like` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
  }
  addPost(req, res, next) {
    const currentUser = req.user.id;
    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `date`, `tags`, `uid`) VALUES (?)";
    const VALUES = [
      req.body.title,
      req.body.desc,
      req.body.img,
      moment().format(),
      req.body.tags,
      currentUser,
    ];
    db.query(q, [VALUES], (err, data) => {
      if (err) res.status(500).json(err.message);
      return res.status(200).json("Add post successfully!");
    });
  }
  updatePost(req, res, next) {
    const currentUser = req.user.id;
    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `tags` = ? WHERE `id` =? AND `uid`=?";
    const VALUES = [req.body.title, req.body.desc, req.body.img, req.body.tags];
    db.query(q, [...VALUES, postId, currentUser ], (err, data) => {
      if (err) res.status(500).json(err.message);
      return res.status(200).json("Update post successfully!");
    });
  }
  deletePost(req, res, next) {}
}

export default new postController();
