const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin, Course } = require("../db");
const router = Router();

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const isAdmin = await Admin.findOne({ username, password });

  if (isAdmin) {
    console.log(isAdmin);

    res.json({ msg: "user already exists" });
  }

  const adminId = await Admin.create({ username, password });
  console.log(adminId);
  res.json({ msg: "new user created", adminId });
});

router.post("/courses", adminMiddleware, (req, res) => {
  // Implement course creation logic
  const title = req.body.title;
  const description = req.body.description;
  const imageLink = req.body.imageLink;
  const price = req.body.price;
  //should you zod, because users can send any thing
  Course.create({ title, description, price, imageLink }).then((response) => {
    res.json({ msg: "course added", courseId: response._id });
  });
});

router.get("/courses", adminMiddleware, async (req, res) => {
  // Implement fetching all courses logic
  const response = await Course.find({});

  res.json({ courses: response });
});

module.exports = router;
