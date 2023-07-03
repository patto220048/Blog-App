import db from "../database/db.js";
import createErrorMessage from "../errors/handleErr.js";
class postController {
  //get all posts
  getPosts(req, res, next) {
    const itemsPerPage = 10;
    const currentPage = req.query.page < 0 ? 1 : req.query.page 
    const offset = (currentPage - 1) * itemsPerPage;
    const q = req.query.tags || req.query.title || req.query.username
      ? `SELECT u.username, u.avatar, p.title, p.desc, p.img, p.like, p.tags, p.createAt, p.updateAt \
      FROM posts p JOIN users u ON p.uid = u.id \
      WHERE tags LIKE '%${req.query.tags}%' \
      OR title LIKE '%${req.query.title}%' \
      OR u.username LIKE '%${req.query.username}%'\
      ORDER BY p.createAt DESC
      LIMIT ${itemsPerPage} \
      OFFSET ${offset}
      `
      : 
      `SELECT u.username, u.avatar, p.title, p.desc, p.img, p.like, p.tags, p.createAt, p.updateAt \
      FROM posts p JOIN users u ON p.uid = u.id \
      ORDER BY p.createAt DESC\
      LIMIT ${itemsPerPage} \
      OFFSET ${offset}`;  
    db.query(q, (err, data) => {
      if (err) return res.json(createErrorMessage(500, "Select post ERROR: " + err.message));
      if (data.length === 0 ) return res.json(createErrorMessage(404,"Post not found!!"));
      res.cookie("tags", {tags: req.query.tags, title: req.query.title, username: req.query.username}, {
        httpOnly: true,
      });
      return res.status(200).json(data);
    });
  }
  // get post
  getPost(req, res, next) {
    const q =
      "SELECT p.id, `email`,`username`, `avatar`, `title`, `desc`,`img`, `createAt`, `updateAt`, `tags`,`like`\
      FROM users u JOIN posts p ON u.id = p.uid\
      WHERE p.id = ?";
    db.query(q, [req.params.id], (err, data) => {
      if (err) return res.json(createErrorMessage(500, "Select post ERROR: " + err.message));
      if (data.length === 0 ) return res.json(createErrorMessage(404,"Post not found!!"));
      return res.status(200).json(data[0]);
    });
  }

  // add new post
  addPost(req, res, next) {
    const currentUser = req.user.id;
    const q =
      "INSERT INTO posts (`title`, `desc`, `img`,`uid`,`tags`) VALUES(?) ";
    const VALUES = [
      req.body.title ,
      req.body.desc,
      req.body.img,
      currentUser,
      req.body.tags,
    ];

    db.query(q, [VALUES], (err, data) => {
      if (err) return res.json(createErrorMessage(500, "Insert post ERROR: " + err.message));
      return res.status(200).json("Add post successfully!");
    });
  }

  // update post
  updatePost(req, res, next) {
    const currentUser = req.user.id;
    const postId = req.params.id;
    const q = "SELECT * FROM `posts` WHERE id = ?";
    db.query(q, [postId], (err, data) => {
      if (err) return res.json(createErrorMessage(500, "SELECT post ERROR: " + err.message));
      if (data.length === 0 ) return res.json(createErrorMessage(404,"Post not found!!"));
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
          if (err) res.json(createErrorMessage(500, "UPDATE post ERROR: " + err.message));
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
      if (err) return res.json(createErrorMessage(500, "SELECT post ERROR: " + err.message));
      if (data.length === 0 ) return res.json(createErrorMessage(404,"Post not found!!"));
      if (data[0].uid === currentUser || req.user.admin) {
        const q = "DELETE FROM posts p WHERE id = ?";
        db.query(q, [postId], (err, data) => {
          if (err) return res.json(createErrorMessage(500, "DELETE post ERROR: " + err.message));

        });
        return res.status(200).json("Delete successfully!");
      } else {
        return res.json(createErrorMessage(401,"You just deleted your post!"));
      }
    });
  }
  //like post
  likePost(req, res, next) {
    const postId = req.params.id;
    //check post exists
    const q = "SELECT id, `like`, `uid` FROM `posts` WHERE id = ?";
    db.query(q, [postId], (err, posts) => {
      if (err) return res.json(createErrorMessage(500, "SELECT post ERROR: " + err.message));
      if (posts.length === 0 ) return res.json(createErrorMessage(404,"Post not found!!"));
      //check user already like post
      const q = "SELECT * FROM likes WHERE userId = ? AND postId = ? ";
      db.query(q, [req.user.id, postId], (err, likes) => {
        if (err) return res.json(createErrorMessage(500, "SELECT post ERROR: " + err.message));
        // user not already like post
        if (likes.length === 0) {
          const q_insert = "INSERT INTO likes (userId, postId) VALUES (?)";
          const VALUES_INSERT_LIKE_TABLE = [req.user.id, postId];
          db.query(q_insert, [VALUES_INSERT_LIKE_TABLE], (err, data) => {
            if (err) return res.json(createErrorMessage(500, "INSERT post ERROR: " + err.message));
            const q_setLikePost = "UPDATE posts SET `like` = ? WHERE `id` = ?";
            const VALUES_LIKE_POST = [(posts[0].like += 1), postId];
            db.query(q_setLikePost, [...VALUES_LIKE_POST], (err, data) => {
              if (err) res.json(createErrorMessage(500, "UPDATE post ERROR: " + err.message));
              return res.status(200).json("Like successfully!!");
            });
          });
        } else {
          return res.json(createErrorMessage (401,"You already like this post!!"));
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
      if (err) return res.json(createErrorMessage(500, "SELECT post ERROR: " + err.message));
      if (posts.length === 0 ) return res.json(createErrorMessage(404,"Post not found!!"));

      //check user already dislike post
      const q = "SELECT * FROM likes WHERE userId = ? AND postId = ? ";
      db.query(q, [req.user.id, postId], (err, likes) => {
        if (err) return res.json(createErrorMessage(500,"Select likes ERROR: " + err.message));
        if(likes.length != 0) {
          const q_DeleteLike = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ? "
          const VALUES_DETELE_LIKE = [req.user.id, postId]
          db.query(q_DeleteLike,[...VALUES_DETELE_LIKE],(err, data)=>{
            if (err) return res.json(createErrorMessage(500,"DELETE likes ERROR: " + err.message));
            //set like current post
            const q_setLikePost = "UPDATE posts SET `like` = ? WHERE `id` = ?"
            const VALUES_UPDATE_POST = [posts[0].like -= 1, postId]
            db.query(q_setLikePost,[...VALUES_UPDATE_POST], (err, data) => {
              if (err) return res.json(createErrorMessage(500,"UPDATE likes ERROR: " + err.message));
              return res.status(200).json("Dislike post updated successfully !!");
            });
          })
        }  
        else {
          return res.json(createErrorMessage(405,"You not like this post, please try again !"));
        }
      });
    });
  }
  recomendPost(req, res, next){
    const cookieTags = req.cookies.tags
    
  }
  
}

export default new postController();
