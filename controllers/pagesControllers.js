const jwt = require('jsonwebtoken');
const isLogedIn = require('../middlewares/isLogedIn');
exports.getHomePage = (req, res) => {
  res.render("homepage");
};

exports.getFeedbackPage = (req, res) => {
  res.render("feedback");
};

exports.getFormPage = (req, res) => {
  res.render("form");
};

exports.getDataVisualizePage = (req, res) => {
  res.render("DataVisualize");
};

exports.getProfilePage = [isLogedIn,(req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.redirect("/login"); // Redirect if token is missing
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    console.log(user);
    res.render("profile", { user });
  } catch (error) {
    console.error("Invalid token:", error);
    return res.status(401).send("Unauthorized. Please log in again.");
  }
}];

exports.getSignupPage = (req, res) => {
  res.render("signup");
};
