// Middleware for authentication
const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
// secret key
const { SECRET_KEY } = require("./../config");

module.exports = (context) => {
  // context = { ... headers}
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ...token... (the bearer and token will be in this format)
    const token = authHeader.split("Bearer ")[1];
    if (token) {
      try {
        const user = jwt.verify(token, SECRET_KEY);
        return user;
      } catch (err) {
        throw new AuthenticationError("Invalid/Expired token");
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error("Authorization header must be provided");
};
