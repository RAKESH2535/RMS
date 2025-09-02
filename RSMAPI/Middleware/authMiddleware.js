const jwt = require('jsonwebtoken');

const authMiddleware = async (req, res, next) => {
  try {
    // Get token from request headers
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    // Verify the token
    const decoded = jwt.verify(token, 'RANDOM-TOKEN'); // Use the same secret as when generating the token

    // Attach user information to the req object
    req.user = {
      ownerId: decoded.ownerId,
      ownerEmail: decoded.ownerEmail,
      tenantDbName: decoded.tenantDbName, // You can store the tenant DB name in the token
      role: decoded.role,
    };

    next(); // Proceed to the next middleware/route
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid', error: error.message });
  }
};

module.exports = authMiddleware;
