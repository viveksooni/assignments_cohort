const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  const coursePurchased = [];
  const checkUser = await User.findOne({ username, password, coursePurchased });

  if (checkUser) {
    console.log(checkUser);
    res.json({ msg: "user already exists" });
  } else {
    const userId = await User.create({ username, password, coursePurchased });
    res.json({ msg: "new user created", userId });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const course = await Course.find({});
  res.json({ course });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.header.username;

  const userupdate = await User.updateOne(
    { username: username },
    { coursePurchased: { "$push": courseId } }
  );
  res.json({ msg: "course purchased successfully" });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  // Implement fetching purchased courses logic
});

module.exports = router;
