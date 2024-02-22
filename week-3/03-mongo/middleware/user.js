const { User } = require("../db");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to  check the  headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;
  console.log(username)
  const isUser = await User.findOne({ username, password });
  if (isUser) {
    next();
  } else {
    res.status(403).json({ msg: "user does not exists" });
  }
}

module.exports = userMiddleware;
