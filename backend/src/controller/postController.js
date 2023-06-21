import db from "../database/db.js";
import moment from "moment";
import createErrorMessage from "../errors/handleErr.js";
class postController {
  //get all posts
  getPosts(req, res, next) {
    const q = req.query.category
      ? "SELECT `title`, `desc`,`img`, `date`, `tags` FROM posts p WHERE tags = ?"
      : "SELECT * FROM posts";
    db.query(q, [req.query.category], (err, data) => {
      if (err) return res.status(500).json(err);
      res.cookie("tags", data[0].tags, {
        httpOnly: true,
      });
      return res.status(200).json(data);
    });
  }
  // get post
  getPost(req, res, next) {
    const q =
      "SELECT p.id, `email`,`username`, `avatar`, `title`, `desc`,`img`, `date`, `tags` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ?";
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
      if (err) return res.status(500).json(err.message);
      return res.status(200).json("Add post successfully!");
    });
  }

  // update post
  updatePost(req, res, next) {
    const currentUser = req.user.id;
    const postId = req.params.id;
    const q = "SELECT * FROM `posts` WHERE id = ?";
    db.query(q, [postId], (err, data) => {
      if (err) return res.status(500).json(err.message);
      if (data.length === 0) return res.status(404).json("Post not found");
      if (data[0].uid === currentUser || req.user.admin) {
        const q =
          "UPDATE posts SET `title` = ?, `desc` = ?, `img` = ?, `tags` = ? WHERE `id` =? AND `uid`=?";
        const VALUES = [
          req.body.title,
          req.body.desc,
          req.body.img,
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
    //check
    const q = "SELECT * FROM `posts` WHERE id = ?";
    db.query(q, [postId], (err, data) => {
      if (err) return res.status(500).json(err.message);
      if (data.length === 0) return res.status(404).json("Post not found");
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
  //like post
  likePost(req, res, next) {
    const postId = req.params.id;
    //check post exists
    const q = "SELECT id, `like`, `uid` FROM `posts` WHERE id = ?";
    db.query(q, [postId], (err, posts) => {
      if (err) return res.status(500).json("Select post EROR: " + err.message);
      if (posts.length === 0) return res.status(404).json("Post not found");
      //check user already like post
      const q = "SELECT * FROM likes WHERE userId = ? AND postId = ? ";
      db.query(q, [req.user.id, postId], (err, likes) => {
        if (err)
          return res
            .status(500)
            .json("Select from likes ERROR: " + err.message);
        // user not already like post
        if (likes.length === 0) {
          const q_insert = "INSERT INTO likes (userId, postId) VALUES (?)";
          const VALUES_INSERT_LIKE_TABLE = [req.user.id, postId];
          db.query(q_insert, [VALUES_INSERT_LIKE_TABLE], (err, data) => {
            if (err)
              return res.status(500).json("Insert likes ERROR: " + err.message);
            const q_setLikePost = "UPDATE posts SET `like` = ? WHERE `id` = ?";
            const VALUES_LIKE_POST = [(posts[0].like += 1), postId];
            db.query(q_setLikePost, [...VALUES_LIKE_POST], (err, data) => {
              if (err)
                return res
                  .status(500)
                  .json("Update posts ERROR: " + err.message);
              return res.status(200).json("Like successfully!!");
            });
          });
        } else {
          return res.status(401).json("You already like this post!!");
        }
      });
    });
  }
  //dislike post
  dislikePost(req, res, next) {
    const postId = req.params.id;
    //check post exists
    const q = "SELECT id, `like`, `uid` FROM `posts` WHERE id = ?";
    db.query(q, [postId], (err, posts) => {
      if (err) return res.status(500).json("Select post ERROR: " + err.message);
      if (posts.length === 0) return res.status(404).json("Post not found");
      //check user already dislike post
      const q = "SELECT * FROM dislikes WHERE userId = ? AND postId = ? ";
      db.query(q, [req.user.id, postId], (err, dislikes) => {
        if (err)
          return res
            .status(500)
            .json("Select from dislikes ERROR: " + err.message);
        // user not already like post
        if (dislikes.length === 0) {
          const q_insert = "INSERT INTO dislikes (userId, postId) VALUES (?)";
          const VALUES_INSERT_DISLIKE_TABLE = [req.user.id, postId];
          db.query(q_insert, [VALUES_INSERT_DISLIKE_TABLE], (err, data) => {
            if (err)
              return res
                .status(500)
                .json("Insert dislikes ERROR: " + err.message);
            const q_setDisLikePost =
              "UPDATE posts SET `like` = ? WHERE `id` = ?";
            const VALUES_DISLIKE_POST = [(posts[0].like -= 1), postId];
            db.query(
              q_setDisLikePost,
              [...VALUES_DISLIKE_POST],
              (err, data) => {
                if (err)
                  return res
                    .status(500)
                    .json("Update posts ERROR: " + err.message);
                return res.status(200).json("Dislike successfully!!");
              }
            );
          });
        } else {
          return res.status(401).json("You already dislike this post!!");
        }
      });
    });
  }
}

export default new postController();
