// Middleware to check if user is logged in
function isLogedIn(req, res, next) {
    const token = req.cookies.token;
  
    if (!token) {
      return res.status(401).send("Access denied. Please log in.");
    }
  
    jwt.verify(token, "key", (err, decoded) => {
      if (err) {
        return res.status(401).send("Invalid token.");  // Ensure response is only sent once
      }
      req.user = decoded;  // Attach user data to request object
      next();  // Proceed to the next middleware or route handler
    });
  }

  module.exports = isLogedIn