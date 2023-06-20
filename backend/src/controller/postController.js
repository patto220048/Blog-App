import db from "../database/db.js";
import moment from "moment";

class postController {
  //list to tags 

  //get all posts
  getPosts(req, res, next) {
    const q = req.query.category
      ? "SELECT `title`, `desc`,`img`, `date`, `like` , `tags` FROM posts p WHERE tags = ?"
      : "SELECT * FROM posts";
    db.query(q, [req.query.category], (err, data) => {
      if (err) res.status(500).json(err);
      return res.status(200).json(data);
    });
  }
  // get post
  getPost(req, res, next) {
    const q =
      "SELECT p.id, `email`,`username`, `avatar`, `title`, `desc`,`img`, `date`, `tags`, `like` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(data[0]);
    });
  }

  // add new post
  addPost(req, res, next) {
    const currentUser = req.user.id;
    const q =
      "INSERT INTO posts (`title`, `desc`, `img`,`date`,`uid`,`tags`) VALUES(?) ";
    const VALUES = [
      req.body.title,
      req.body.desc,
      req.body.img,
      moment().format(),
      currentUser,
      req.body.tags,
    ];

    db.query(q, [VALUES], (err, data) => {
      if (err) res.status(500).json(err.message);
      return res.status(200).json("Add post successfully!");
    });
  }

  // update post
  updatePost(req, res, next) {
    const currentUser = req.user.id;
    const postId = req.params.id;
    const q = "SELECT * FROM `posts` WHERE id = ?";
    db.query(q, [postId], (err, data) => {
      if (err) res.status(500).json(err.message);
      if (data.length === 0) res.status(404).json("Post not found");
      if (data[0].uid === currentUser || req.user.admin) {
        const q =
          "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `date`= ?, `tags` = ? WHERE `id` =? AND `uid`=?";
        const VALUES = [
          req.body.title,
          req.body.desc,
          req.body.img,
          moment().format(),
          req.body.tags,
        ];
        db.query(q, [...VALUES, postId, currentUser], (err, data) => {
          if (err) res.status(500).json(err.message);
        });
        return res.status(200).json("Update post successfully!");
      } else {
        return res.status(403).json("You just update your post!");
      }
    });
  }
  //delete post
  deletePost(req, res, next) {
    const currentUser = req.user.id;
    const postId = req.params.id;

    const q = "SELECT * FROM `posts` WHERE id = ?";
    db.query(q, [postId], (err, data) => {
      if (err) res.status(500).json(err.message);
      if (data.length === 0) res.status(404).json("Post not found");
      if (data[0].uid === currentUser || req.user.admin) {
        const q = "DELETE FROM posts p WHERE id = ?";
        db.query(q, [postId], (err, data) => {
          if (err) return res.status(500).json(err.message);
        });
        return res.status(200).json("Delete successfully!");
      } else {
        return res.status(403).json("You just deleted your post!");
      }
    });
  }

  likePost(req, res, next) {

  }
}

export default new postController();
