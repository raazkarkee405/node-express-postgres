require("../../config/config");
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
 
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log('decded',decoded);
    req.userData = decoded;
    next();
  } else {
    res.status(400).json({ message: "Token not supplied" });
  }

};