// Middleware for handling auth

const { Admin } = require("../db");

async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  const username = req.headers.username;
  const password = req.headers.password;

  const isAdmin = await Admin.findOne({ username, password });

  if (isAdmin) {
    next();
  } else {
    res.status(403).json({ msg: "user does not exists" });
  }
}

module.exports = adminMiddleware;
